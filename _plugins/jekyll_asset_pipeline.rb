require 'japr'

module JAPR
  class CssCompressor < JAPR::Compressor
    require 'yui/compressor'

    def self.filetype
      '.css'
    end

    def compress
      return YUI::CssCompressor.new.compress(@content)
    end
  end

  class JavaScriptCompressor < JAPR::Compressor
    require 'yui/compressor'

    def self.filetype
      '.js'
    end

    def compress
      return YUI::JavaScriptCompressor.new(munge: true).compress(@content)
    end
  end

  class LessConverter < JAPR::Compressor
    require 'less'

    def self.filetype
      '.less'
    end

    def convert
      parser = Less::Parser.new
      return parser.parse(@content).to_css#(:compress => true)
    end
  end
end
