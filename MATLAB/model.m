%%
% Konstanter osv.

%JordRadie = 6371*1000;
%JordMassaa = 5,972*10^24;
%G = 6,67408*10^-11;

%% Test
% test 1

clear, clc

do = 1;
a = do*2;

u = 10^10;

terra = planet(1, [0 -0.000003 0], [do 0 0], [0 0 0]);
lunar = planet(1, [0 0.000003 0], [-do 0 0], [0 0 0]);

system = [terra lunar];

time = 100;
steplength = 15000;


for j=1:time
    
    for i = 1:length(system)
        
        scatter3(system(i).position(1), system(i).position(2), system(i).position(3));
        vectarrow(system(i).position, system(i).position + system(i).force.*u);
        hold on
    end
    
    legend('Terra', 'Lunar');
    axis([-a a -a a -a a]);
    
    system = sumForceSystem(system);
    system = nextPosition(system, steplength);

    hold off
    
    %[system(1).position(1) system(1).position(2) system(1).position(3)]
    %[system(1).velocity(1) system(1).velocity(2) system(1).velocity(3)]
    %[system(1).force(1) system(1).force(2) system(1).force(3)]
    
    pause(0.1);
end

