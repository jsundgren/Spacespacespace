function [ y2 ] = RungeKutta( x, y, F_xy, h)

    k_1 = F_xy(x,y);
    k_2 = F_xy(x+0.5*h,y+0.5*h*k_1);
    k_3 = F_xy((x+0.5*h),(y+0.5*h*k_2));
    k_4 = F_xy((x+h),(y+k_3*h));

    y2 = y + (1/6)*(k_1+2*k_2+2*k_3+k_4)*h;  % main equation


end

