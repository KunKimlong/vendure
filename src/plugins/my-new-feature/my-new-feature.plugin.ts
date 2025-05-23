import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { MY_NEW_FEATURE_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: MY_NEW_FEATURE_PLUGIN_OPTIONS, useFactory: () => MyNewFeaturePlugin.options }],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
})
export class MyNewFeaturePlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<MyNewFeaturePlugin> {
        this.options = options;
        return MyNewFeaturePlugin;
    }

    static ui: AdminUiExtension = {
        id: 'my-new-feature-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'my-new-feature', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
