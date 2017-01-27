
clear, clc

do = 1;
a = do*2;
v = 0.000005;

u = 10^11;

terra = planet(1.1, [0 v 0], [do 0 0], [0 0 0]);
lunar = planet(1.2, [-v 0 0], [0 do 0], [0 0 0]);
smoon = planet(1.3, [0 -v 0], [-do 0 0], [0 0 0]);
kerbal = planet(1.3, [v 0 0], [0 -do 0], [0 0 0]);

system = [terra lunar smoon kerbal];
system = sumForceSystem(system);

%
T = 0;
N = 0;
com = [0 0 0];

for i = 1:length(system)
   for j = 1:3
    T = T + ( system(i).mass * system(i).position(j))
    N = N + system(i).mass
    
    com(j) = T/N;
   end
end
%

for i = 1:length(system)
        
    scatter3(system(i).position(1), system(i).position(2), system(i).position(3));
    hold on
    scatter3(com(1), com(2), com(3),'x');
end

axis([-a a -a a -a a]);
