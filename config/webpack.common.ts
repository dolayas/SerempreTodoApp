import { default as CircularDependencyPlugin } from "circular-dependency-plugin"
import { CleanWebpackPlugin as CleanPlugin } from "clean-webpack-plugin"
import { default as CopyPlugin } from "copy-webpack-plugin"
import { default as ESLintPlugin } from "eslint-webpack-plugin"
import { default as ForkTsCheckerPlugin } from "fork-ts-checker-webpack-plugin"
import { default as HtmlPlugin } from "html-webpack-plugin"
import { default as MiniCssExtractPlugin } from "mini-css-extract-plugin"
import { dirname, join, resolve, sep } from "path"
import { resolveTsAliases } from "resolve-ts-aliases"
import { Configuration, ProgressPlugin } from "webpack"

import { build } from "./app-config.json"

const RootPath = resolve (__dirname, "../")

const SourcePath = join (RootPath, "src")

const fromRoot = (path : string) => join (RootPath, path)

const fromSources = (path : string) => join (SourcePath, path)

const createModuleReplacement = (resourceModule : string, newModule : string) =>
{
    const replaceRegex = RegExp (resourceModule.replace (/[\\/]/g, "[\\\\/]").replace (/\./gm, "\\."))

    const sourcePath = newModule.replace (/[\\/]/g, sep)

    const sourceDirname = join (dirname (resourceModule), sep)

    const newSourceFile = sourcePath.replace (sourceDirname, "")

    return [ replaceRegex, newSourceFile ]
}

const CommonConfig : Configuration =
{
    context : RootPath,
    entry :
    {
        polyfills : fromRoot (build.options.polyfills),
        styles : build.options.styles.map (fromRoot),
        ...build.options.scripts.length > 0
            ? { scripts : build.options.scripts.map (fromRoot) }
            : {},
        main : fromRoot (build.options.main)
    },
    module :
    {
        rules :
        [
            {
                loader : "html-loader",
                options :
                {
                    esModule : false
                },
                test : /\.html?$/
            },
            {
                exclude :
                [
                    /node_modules/
                ],
                loader : "ts-loader",
                options :
                {
                    configFile : fromRoot (build.options.tsConfig),
                    transpileOnly : true
                },
                test : /\.ts(x)?$/
            },
            {
                loader : "file-loader",
                options :
                {
                    context : SourcePath,
                    emitFile : false,
                    name : "[path][name].[ext]"
                },
                test :
                [
                    /\.(png|jpe?g|gif|svg|ico|gif|webp)/,
                    /\.(woff|woff2?|ttf|eot|otf)$/,
                    /\.(mp3|ogg|wav|acc)$/,
                    /\.(mp4|webm)$/
                ]
            }
        ],
        strictExportPresence : true
    },
    node :
    {
        console : true,
        global : true
    },
    output :
    {
        filename : "[name].bundle.js",
        path : fromRoot (build.options.outputPath),
        pathinfo : false
    },
    performance :
    {
        hints : false,
        maxAssetSize : 512000,
        maxEntrypointSize : 512000
    },
    plugins :
    [
        new MiniCssExtractPlugin ({ filename : "[name].bundle.css" }),
        new ProgressPlugin ({ activeModules : false, modules : false, profile : true }),
        new CircularDependencyPlugin ({
            allowAsyncCycles : false,
            cwd : RootPath,
            exclude : /[\\/]node_modules[\\/]/i,
            failOnError : false
        }),
        new CleanPlugin ({ cleanAfterEveryBuildPatterns : [ "**/**/*.*" ] }),
        new CopyPlugin ({
            patterns :
            [
                ...build.options.assets.map (path =>
                    ({
                        context : SourcePath,
                        from : typeof path === "string" ? path : path.from,
                        globOptions :
                        {
                            ignore : [ ".gitkeep", "**/.DS_Store", "**/Thumbs.db", "**/.ini" ]
                        },
                        noErrorOnMissing : true,
                        to : typeof path === "string" ? path : path.to
                    })),
            ],
        }),
        new HtmlPlugin ({
            cache : true,
            filename : "index.html",
            hash : true,
            inject : true,
            minify : true,
            scriptLoading : "defer",
            template : fromRoot (build.options.index)
        }),
        new ForkTsCheckerPlugin ({
            async : true,
            formatter : "basic",
            typescript :
            {
                configFile : fromRoot (build.options.tsConfig),
            }
        }),
        new ESLintPlugin ({
            extensions : [ ".js", ".ts", ".tsx" ],
            files : "./src/**/*.{ts,tsx,js,jsx}"
        })
    ],
    resolve :
    {
        alias :
        {
            ...resolveTsAliases (fromRoot (build.options.tsConfig))
        },
        extensions : [ ".ts", ".tsx", ".js" ],
        mainFields : [ "browser", "module", "main" ],
        modules : [ SourcePath, "node_modules" ]
    },
    resolveLoader :
    {
        modules : [ "node_modules" ]
    },
    target : "web"
}

export { fromRoot, fromSources, CommonConfig, createModuleReplacement }