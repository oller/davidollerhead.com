require 'jekyll_asset_pipeline'

module JekyllAssetPipeline

	class JavaScriptCompressor < JekyllAssetPipeline::Compressor
		require 'closure-compiler'

		def self.filetype
			'.js'
		end

		def compress
			return Closure::Compiler.new.compile(@content)
		end
	end

	class CssCompressor < JekyllAssetPipeline::Compressor
		require 'yui/compressor'

		def self.filetype
			'.css'
		end

		def compress
			return YUI::CssCompressor.new.compress(@content)
		end
	end

	class LessConverter < JekyllAssetPipeline::Converter
			require 'less'

			def self.filetype
				'.less'
			end

			def convert
				parser = Less::Parser.new
				return parser.parse(@content).to_css#(:compress => true)
			end
	end

 # class SassConverter < JekyllAssetPipeline::Converter
 #    require 'sass'

 #    def self.filetype
 #      '.scss'
 #    end

 #    def convert
 #      return Sass::Engine.new(@content, syntax: :scss).render
 #      return Sass::Engine.new(@content, load_paths: ['.','_assetsToCompile/sass'], syntax: :scss).render
 #    end
 #  end

end