<?php

namespace Examples;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function すべてのユーザーを取得できること(): void
    {
        $users = User::factory()->count(3)->create();

        $response = $this->getJson('/api/examples/users');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name'],
            ],
        ]);
        foreach ($users as $user) {
            $response->assertJsonFragment([
                'id' => $user->id,
                'name' => $user->name,
            ]);
        }
    }

    #[Test]
    public function 特定のユーザーを取得できること(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/examples/users/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
        ]);
    }

    #[Test]
    public function 存在しない_i_dの場合はnullが返ること(): void
    {
        $response = $this->getJson('/api/examples/users/9999');

        $response->assertStatus(200);
        $response->assertJson(['data' => null]);
    }

    #[Test]
    public function ユーザーを作成できること(): void
    {
        $expected = [
            'name' => $this->faker->name,
        ];
        $this->mock(StoreUserRequest::class, function ($mock) use ($expected) {
            $mock->shouldReceive('all')->andReturn($expected);
        });

        $response = $this->postJson('/api/examples/users', $expected);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['id', 'name'],
        ]);
        $response->assertJson([
            'data' => [
                'name' => $expected['name'],
            ],
        ]);
        $this->assertDatabaseHas('users', [
            'name' => $expected['name'],
        ]);
    }

    #[Test]
    #[DataProvider('invalidPostBodies')]
    public function バリデーションエラーの場合はユーザー作成が失敗すること(?string $name): void
    {
        $response = $this->postJson('/api/examples/users', ['name' => $name]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    /**
     * @return array<string, array<string|null>>
     */
    public static function invalidPostBodies(): array
    {
        return [
            '空文字の場合' => [''],
            'nullの場合' => [null],
            '最大文字数を超える場合' => [str_repeat('a', 256)],
        ];
    }

    #[Test]
    public function ユーザーを更新できること(): void
    {
        $user = User::factory()->create();
        $expected = [
            'name' => $this->faker->name,
        ];
        $this->mock(UpdateUserRequest::class, function ($mock) use ($expected) {
            $mock->shouldReceive('all')->andReturn($expected);
        });

        $response = $this->putJson("/api/examples/users/{$user->id}", $expected);

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $expected['name'],
            ],
        ]);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => $expected['name'],
        ]);
    }

    #[Test]
    public function 存在しないユーザーの更新時にnullが返ること(): void
    {
        $response = $this->putJson('/api/examples/users/9999', ['name' => $this->faker->name]);

        $response->assertStatus(200);
        $response->assertJson(['data' => null]);
    }

    #[Test]
    #[DataProvider('invalidPutBodies')]
    public function バリデーションエラーの場合はユーザー更新が失敗すること(?string $name): void
    {
        $user = User::factory()->create();

        $response = $this->putJson("/api/examples/users/{$user->id}", ['name' => $name]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    /**
     * @return array<string, array<string|null>>
     */
    public static function invalidPutBodies(): array
    {
        return [
            '空文字の場合' => [''],
            'nullの場合' => [null],
            '最大文字数を超える場合' => [str_repeat('a', 256)],
        ];
    }

    #[Test]
    public function ユーザーを削除できること(): void
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/examples/users/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson(['data' => null]);
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    #[Test]
    public function 存在しないユーザーの削除時にもnullが返ること(): void
    {
        $response = $this->deleteJson('/api/examples/users/9999');

        $response->assertStatus(200);
        $response->assertJson(['data' => null]);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
