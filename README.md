# Scale-of
Basic use
make sure to create a folder(dir) with in the project folder. That folder should be named images.
place all the images you would like to add to the  program in to that folder.
run the init.py script, this will generate a few thing: style.css, index.html, and image_config.json.
we only really care about image_config.json right now.
after you open the file you will be greeted with the id witch = the image file name (this could lead to errors if you have lets say guy.png and a guy.jpg. all file names should be unique)
you should eddit the size to be = to how log the object is (note: size is represented like 10^size)
the dx and dy dictait how the image will move ( dx: -1 will move the image to the left, dx: 1 will move it to the right. dy: -1 moves the image up, dy: 1 moves the image down)
after the image_config.json is filled out run the application as server (simply draging and droping the index.html might create errors so run it as a local server or add it your actule website)
