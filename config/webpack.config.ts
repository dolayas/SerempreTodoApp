import { default as autoprefixer } from "autoprefixer"
import { default as CompressionPlugin } from "compression-webpack-plugin"
import { default as MiniCssExtractPlugin } from "mini-css-extract-plugin"
import * as Sass from "sass"
import { default as SpeedMeasurePlugin } from "speed-measure-webpack-plugin"
import { default as TerserPlugin } from "terser-webpack-plugin"
import {
    Configuration, HashedModuleIdsPlugin, NormalModuleReplacementPlugin, Plugin
} from "webpack"
import { merge } from "webpack-merge"
import { GenerateSW } from "workbox-webpack-plugin"

import { default as AppConfig } from "./app-config.json"
import { CommonConfig, createModuleReplacement, fromRoot } from "./webpack.common"

const webpackOutputOptions =
{
    assets : true,
    children : false,
    chunkModules : false,
    chunks : true,
    colors:  true,
    errorDetails : false,
    errors : true,
    hash : true,
    moduleTrace : false,
    modules : false,
    reasons : false,
    timings : true,
    version : false,
    warnings : true
}

const verboseWebpackOutputOptions =
{
    assets : true,
    children : true,
    chunkModules : true,
    colors : false,
    errorDetails : true,
    maxModules : Infinity,
    moduleTrace : true,
    optimizationBailout : true,
    reasons : true,
    usedExports : true,
    version : true
}

const speedMeasurePlugin = new SpeedMeasurePlugin ()

export default (_env : NodeJS.ProcessEnv, args : Record<string, any>) : Configuration =>
{
    const { build : { configurations : appConfigurations, options }, serve : { options : ServeOptions } } = AppConfig

    const {
        allowedHosts,
        compress,
        historyApiFallback,
        host,
        hot,
        liveReload,
        open,
        port,
    } = ServeOptions

    const { mode : webpackMode = "development", configuration = "none" } = args

    const mode : Configuration["mode"] = webpackMode || "development"

    if ( !(configuration in appConfigurations) && configuration !== "none" )
        throw Error (`Invalid configuration : ${ configuration }`)

    const configurations : (typeof appConfigurations)[keyof typeof appConfigurations] = configuration === "none"
        ? {
            bundles : [],
            compress : true,
            extractCss : false,
            fileReplacements : [],
            optimization : true,
            publicPath : "/",
            sourceMap : true,
            verbose : true
        }
        : appConfigurations[configuration as keyof typeof appConfigurations]

    const productionPlugins =
    [
        new GenerateSW ({
            clientsClaim : true,
            skipWaiting : true,
            sourcemap : true
        }),
        ...configurations
            .fileReplacements
            .map (({ replace, with : withSource }) => createModuleReplacement (replace, withSource))
            .map (([ replace, withSource ]) => new NormalModuleReplacementPlugin (replace, withSource))
    ]

    const developmentPlugins : Plugin[] = [ ]

    const config : Configuration =
    {
        devServer :
        {
            allowedHosts,
            clientLogLevel : "warning",
            compress,
            contentBase : fromRoot (options.outputPath),
            disableHostCheck : true,
            historyApiFallback,
            host,
            hot,
            liveReload,
            open,
            overlay : true,
            port,
            publicPath : "/",
            stats : "errors-only"
        },
        devtool : webpackMode === "development" ? "inline-source-map" : "nosources-source-map",
        mode,
        module :
        {
            rules :
            [
                {
                    exclude :  /\.module\.(s(a|c)ss|css)$/,
                    test : /\.(s(a|c)ss|css)$/,
                    use :
                    [
                        (configurations.extractCss && MiniCssExtractPlugin.loader) || "style-loader",
                        {
                            loader : "css-loader",
                            options :
                            {
                                modules : false,
                                sourceMap : configurations.sourceMap,
                            }
                        },
                        {
                            loader : "sass-loader",
                            options :
                            {
                                implementation : Sass,
                                sassOptions :
                                {
                                    includePaths : options.stylePreprocessorOptions.includePaths.map (fromRoot),
                                    indentWidth : 4,
                                    precision : 8
                                },
                                sourceMap : configurations.sourceMap
                            }
                        },
                        {
                            loader : "postcss-loader",
                            options :
                            {
                                ident: "postcss",
                                plugins :
                                [
                                    autoprefixer ()
                                ],
                                sourceMap  : configurations.sourceMap
                            }
                        }
                    ]
                },
                {
                    test : /\.module\.(s(a|c)ss|css)$/,
                    use :
                    [
                        MiniCssExtractPlugin.loader,
                        {
                            loader : "css-loader",
                            options :
                            {
                                importLoaders : 1,
                                modules :
                                {
                                    localIdentName : "[local]"
                                },
                                onlyLocals : false,
                                sourceMap : configurations.sourceMap
                            }
                        },
                        {
                            loader : "sass-loader",
                            options :
                            {
                                implementation : Sass,
                                sassOptions :
                                {
                                    includePaths : options.stylePreprocessorOptions.includePaths.map (fromRoot),
                                    indentWidth : 4,
                                    precision : 8
                                },
                                sourceMap : configurations.sourceMap
                            }
                        },
                        {
                            loader : "postcss-loader",
                            options :
                            {
                                ident: "postcss",
                                plugins :
                                [
                                    autoprefixer ()
                                ],
                                sourceMap  : configurations.sourceMap
                            }
                        }
                    ]
                }
            ]
        },
        optimization :
        {
            concatenateModules : true,
            minimize : mode === "production",
            minimizer : mode === "production"
                ? [
                    new HashedModuleIdsPlugin (),
                    new TerserPlugin ({
                        extractComments : false,
                        sourceMap : false,
                        test : /\.js(\?.*)?$/i
                    })
                ]
                : undefined,
            runtimeChunk : "single",
            splitChunks :
            {
                cacheGroups :
                {
                    vendor :
                    {
                        chunks : "initial",
                        enforce : true,
                        name : "vendor",
                        test : /[\\\\/]node_modules[\\\\/]/
                    }
                },
                chunks : "async",
                maxAsyncRequests : Infinity
            }
        },
        output :
        {
            publicPath : configurations.publicPath
        },
        plugins :
        [
            ...(configurations.compress && [ new CompressionPlugin () ]) || [],
            ...(mode === "development" && developmentPlugins) || productionPlugins
        ],
        stats : configurations.verbose ? verboseWebpackOutputOptions : webpackOutputOptions
    }

    return speedMeasurePlugin.wrap (merge (CommonConfig, config))
}