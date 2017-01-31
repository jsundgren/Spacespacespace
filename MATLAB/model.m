%% Test
% test 1

clear, clc

do = 1;
a = do*2;
v = 0.000005;

u = 10^9;

terra = planet(1.1, [0 v 0], [do 0 0], [0 0 0]);
lunar = planet(1.2, [-v 0 0], [0 do 0], [0 0 0]);
smoon = planet(1.3, [0 -v 0], [-do 0 0], [0 0 0]);
kerbal = planet(1.3, [v 0 0], [0 -do 0], [0 0 0]);


system = [terra lunar smoon kerbal];

time = 80;
steplength = 8000;


for j=1:time
    
    system = sumForceSystem(system);
    com = COM( system );
    
    for i = 1:length(system)
        %3D-plot
        scatter3(system(i).position(1), system(i).position(2), system(i).position(3));
        hold on
        scatter3(com(1), com(2), com(3), 'x');
        hold on
        vectarrow(system(i).position, system(i).position + system(i).force.*u);
        hold on
    end
   
    axis([-a a -a a -a a]);
    
    system = nextPosition(system, steplength);

    hold off
    
    %[system(1).position(1) system(1).position(2) system(1).position(3)]
    %[system(1).velocity(1) system(1).velocity(2) system(1).velocity(3)]
    %[system(1).force(1) system(1).force(2) system(1).force(3)]
    
    pause(0.02);

end

