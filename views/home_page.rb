require 'erector'

class HomePage < Erector::Widget
  def content
    html do
      head do
        title 'Reversi'
        link :href => "/css/style.css", :rel => "stylesheet", :type => "text/css"   
      end
      body do
        h2 'REVERSI'
        div :class => 'board' do
          table :cellpadding='0', :cellspacing='0' do
            draw_board(10)
          end
        end
      end
    end
  end
  
  def draw_board(size)
   
    y = 0
    size.times do 
      tr :class => 'board_row' do
        x = 0
        size.times do
          puts "x = #{x} y = #{y}"
          td :class => 'square' do
            if (x == 5 && y == 5)
              img :src => '/images/white_piece.png'
            else
              rawtext '&nbsp;'
            end
          end
          x += 1
        end
      end
      y += 1
    end
  end
  
  
end