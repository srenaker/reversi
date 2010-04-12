require 'erector'

class HomePage < Erector::Widget
  
  BOARD_SIZE = 8
  
  def content
    puts "bs #{BOARD_SIZE}"
    html do
      head do
        title 'Reversi'
        link :href => "/css/style.css", :rel => "stylesheet", :type => "text/css"   
        script :src => '/js/reversi.js', :type => 'text/javascript'
        script :src => '/js/jquery.js', :type => 'text/javascript'

      end
      body do
        div :class => 'control_panel' do
          form :name => 'controls' do
            input :class => 'start_button',  :type => 'button', :value => 'Start game', :onclick => "startGame(#{BOARD_SIZE});"
          
            div :class => 'score' do
              text "White score: "
              input :class => 'score_field', :name => 'white_score', :size => '6'
            end
            div :class => 'score' do
              text "Black score: "
              input :class => 'score_field', :name => 'black_score', :size => '6'
            end
          end
          
          div :class => 'whose_turn'
        end
        
        div :class => 'board' do
          table :cellpadding => '0', :cellspacing => '0' do
            draw_board(BOARD_SIZE)
          end
        end
      end
    end
  end
  
  def draw_board(size)
    x = 0
    size.times do 
      tr :class => 'board_row' do
        y = 0
        size.times do
          square_id = "#{x}#{y}"
          td :class => 'square', :id => square_id, :onclick => "move(#{square_id})" do
              rawtext '&nbsp;'
          end
          y += 1
        end
      end
      x += 1
    end
  end
  
  
end