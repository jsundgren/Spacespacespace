%% Test
% test 1

clear, clc

do = 1;
a = do*2;
v = 0.000005;

u = 10^9;
%sun = planet(333000, [0 0 0], [0 0 0], [0 0 0]);
% mass, position, velocity, force

terra = planet(1.1, [0 v 0], [do 0 0], [0 0 0]);
%lunar = planet(1/6, [0 v 0], [do+0.257 0 0], [0 0 0]);
lunar = planet(1.3, [-v 0 0], [0 do 0], [0 0 0]);
smoon = planet(1.3, [0 -v 0], [-do 0 0], [0 0 0]);
kerbal = planet(1.3, [v 0 0], [0 -do 0], [0 0 0]);


system = [terra lunar smoon kerbal];

time = 80;
steplength = 8000;


for j=1:time
    
    system = sumForceSystem(system);
    com = COM( system );
    
    %kommentera ut om du inte vill skapa biler
    f = figure();
    for i = 1:length(system)
        %3D-plot
        
        scatter3(system(i).position(1), system(i).position(2), system(i).position(3));
        hold on
        scatter3(com(1), com(2), com(3), 'x');
        hold on
        vectarrow(system(i).position, system(i).position + system(i).force.*u);
        hold on
    end
    %mergeing string to create new image for every iteration in loop
    
    axis([-a a -a a -a a]);

    system = nextPosition(system, steplength);

    hold off

    %kommentera ut om du inte vill skapa bilder, härifrån...    
    temp = j;
    if j<10
        temp = '0' + int2str(temp);
    end
    
        s1 = 'image';
        str = int2str(temp);
        s2 = '.png';

    imageName = strcat(s1, str, s2);
    saveas(f, imageName);
    %... till hit
    
    %[system(1).position(1) system(1).position(2) system(1).position(3)]
    %[system(1).velocity(1) system(1).velocity(2) system(1).velocity(3)]
    %[system(1).force(1) system(1).force(2) system(1).force(3)]
    
    %pause(0.01);

end
%% MOVIEMAKER

% Make an avi movie from a collection of PNG images in a folder.
% Specify the folder.
myFolder = 'C:\Users\Elon\Documents\Kurser\MosProjekt\spacespacespace\MATLAB';
if ~isdir(myFolder)
    errorMessage = sprintf('Error: The following folder does not exist:\n%s', myFolder);
    uiwait(warndlg(errorMessage));
    return;
end
% Get a directory listing.
filePattern = fullfile(myFolder, '*.PNG');
pngFiles = dir(filePattern);
% Open the video writer object.
writerObj = VideoWriter('YourAVI2.avi');
open(writerObj);
% Go through image by image writing it out to the AVI file.
for frameNumber = 1 : length(pngFiles)
    % Construct the full filename.
    baseFileName = pngFiles(frameNumber).name;
    fullFileName = fullfile(myFolder, baseFileName);
    % Display image name in the command window.
    fprintf(1, 'Now reading %s\n', fullFileName);
    % Display image in an axes control.
    thisimage = imread(fullFileName);
    %imshow(imageArray);  % Display image.
    drawnow; % Force display to update immediately.
    % Write this frame out to the AVI file.
    writeVideo(writerObj, thisimage);
end
% Close down the video writer object to finish the file.
close(writerObj);
