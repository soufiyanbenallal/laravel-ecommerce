<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run Shopper's essential seeders to create permissions and roles
        $this->call(\Shopper\Core\Database\Seeders\ShopperSeeder::class);

        // Clear spatie cache just in case
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        $user = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
        ]);
        
        $roleName = config('shopper.core.users.admin_role');
        $role = \Spatie\Permission\Models\Role::findByName($roleName);

        // Explicitly insert into pivot table to ensure the correct polymorphic type mapping is kept
        \DB::table('model_has_roles')->insert([
            'role_id' => $role->id,
            'model_type' => \App\Models\User::class,
            'model_id' => $user->id,
        ]);
    }
}
