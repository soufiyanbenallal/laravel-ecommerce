Getting Started
Configuration

Copy page

Configuration options for Shopper

Shopper uses standard Laravel config files and environment variables for application-level settings.
With the installation of Shopper you will find new configurations files located in config/shopper/. Shopper is a build components blocks, and by default all configuration files are not published and will be published in a components folder inside the Shopper configuration folder.
Here’s the list of configuration files that are published during installation
config/shopper/
    admin.php
    auth.php
    core.php
    features.php
    media.php
    models.php
    orders.php
    routes.php
    settings.php
​
Control Panel
By default, when you install the package, the dashboard is accessible via the prefix /cpanel. You can update this configuration in the admin.php file, or you can add the SHOPPER_PREFIX variable to your .env environment file.
config/shopper/admin.php
'prefix' => env('SHOPPER_PREFIX', 'cpanel'),
If you update this configuration, you have to republish the assets to take the new link. The assets are dynamically loaded by a symbolic link named as the prefix.
sail artisan shopper:link
If you want to configure a specific domain, you can add a SHOPPER_DOMAIN variable to your environment file. This config will use Laravel Route::domain() function
'domain' => env('SHOPPER_DOMAIN'),
​
Database tables prefix
During installation, all tables are prefixed with sh_ so that they don’t conflict with existing tables in your application database. If you change this prefix after installation, you’ll need to refresh migration for the configuration to take effect.
config/shopper/core.php
'table_prefix' => 'sh_',
Run laravel refresh migration command: sail artisan migrate:refresh Re-run the Shopper Database table seeder: sail artisan db:seed --class=\Shopper\Core\Database\Seeders\ShopperSeeder
If you do this knowing that you already have data in your database, you risk losing it. Think carefully, because you’ll be on your own afterwards.
​
Models
Models used are defined in the models config shopper/models.php file, if you want to use your own models you can replace them on this file.
use Shopper\Core\Models;

return [
    'address' => Models\Address::class,

    'brand' => Models\Brand::class,

    'category' => Models\Category::class,

    'collection' => Models\Collection::class,

    'product' => Models\Product::class,

    'variant' => Models\ProductVariant::class,

    'channel' => Models\Channel::class,

    'inventory' => Models\Inventory::class,

    'order' => Models\Order::class,
];
​
Added Middleware
Shopper gives you the ability to add extra middlewares. All these middlewares will be applied to authenticated routes
config/shopper/routes.php
'middleware' => [],
​
Additional dashboard routes
By default, none of your routes in the web.php file will be accessible and loaded in the shopper administration. Routes added in the sidebar have the middleware applied to the dashboard, you must fill in an additional routing file and this will be automatically loaded by Shopper
config/shopper/routes.php
// E.g.: base_path('routes/shopper.php')
'custom_file' => null,
​
Components
The main features of Shopper is to handle Livewire components to add new functionalities to your admin panel.
For this purpose you have components files that lists each Livewire components used within Shopper. You can extend component to add functionality and even change the view to fit your own logic.
Here is a list of components files available. All these files can be published with sail artisan shopper:component:publish
config/shopper/components
    account.php
    brand.php
    category.php
    collection.php
    customer.php
    dashboard.php
    discount.php
    order.php
    product.php
    review.php
    setting.php
You can publish each file individually, allowing you to replace or customize components. All you need to do is issue the same command, but this time specify the name of the configuration file
sail artisan shopper:component:publish brand
​
Settings
Settings are a very important part of an e-commerce site administration. Shopper uses a class-based approach for settings, allowing you to easily add, remove or disable settings pages.
Each setting is a class that implements the Shopper\Contracts\SettingItem interface. The configuration file settings.php registers which settings are enabled or disabled.
config/shopper/settings.php
use Shopper\Settings\Items;

return [
    'items' => [
        Items\GeneralSetting::class => true,
        Items\StaffSetting::class => true,
        Items\LocationSetting::class => true,
        Items\PaymentSetting::class => true,
        Items\CarrierSetting::class => true,
        Items\LegalSetting::class => true,
        Items\ZoneSetting::class => true,
    ],
];
To disable a setting page, simply set its value to false.
​
Creating a custom setting
To create your own setting page, extend the Shopper\Settings\Setting base class:
namespace App\Settings;

use Shopper\Settings\Setting;

final class MyCustomSetting extends Setting
{
    public function name(): string
    {
        return 'My Custom Setting';
    }

    public function description(): string
    {
        return 'Manage your custom configuration.';
    }

    public function icon(): string
    {
        return 'heroicon-o-cog';
    }

    public function url(): string
    {
        return route('shopper.settings.custom');
    }

    public function order(): int
    {
        return 10;
    }

    public function permission(): ?string
    {
        return 'manage_custom_settings';
    }
}
Then register it in the settings.php config file:
'items' => [
    // ... existing settings
    App\Settings\MyCustomSetting::class => true,
],
​
Programmatic registration
You can also register settings programmatically via the SettingManager:
use Shopper\Settings\SettingManager;

app(SettingManager::class)->add(App\Settings\MyCustomSetting::class);
Be careful: if you disable items from the configuration, you will no longer have access to certain interfaces, and this can make the user experience more complex.