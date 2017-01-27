%%
% Konstanter osv.

%JordRadie = 6371*1000;
%JordMassaa = 5,972*10^24;
%G = 6,67408*10^-11;

%% Test
% test 1

%clear, clc
%u=10^8;

%planet1 = planet(20*u, [0 0 0], [0 0 0], [0 0 0]);
%planet2 = planet(3*u, [0 0 0], [1 2 0], [0 0 0]);
%planet3 = planet(3*u, [0 0 0], [2 0 0], [0 0 0]);
%planet4 = planet(3*u, [0 0 0], [2 0 1], [0 0 0]);

%system = [planet1 planet2 planet3 planet4];

earth = planet(5.97237*10^24, [0 0 0], [0 0 0], [0 0 0]);
moon = planet(7.342*10^22 , [0 1022*10^3 0], [384400 0 0], [0 0 0]);

system = [earth, moon];

newSystem = sumForceSystem( system );

time=15;
steplength = 0.05;


for j=1:time
    for i = 1:length(system)
        scatter3(system(i).position(1), system(i).position(2), system(i).position(3));
        hold on
    end
    legend('earth', 'moon');
    axis([-5 5 -5 5 -5 5].*(2*10^5));
    vectarrow(system(i).position, system(i).position+system(i).velocity);
    system = sumForceSystem(system);
    system = nextPosition(system, steplength);
    hold off
    pause(0.1);
    system(2).force 
end

