from os import listdir
from os.path import isfile, join
from pathlib import Path
import ntpath
import json

IMAGE_PATH = 'images'
WWW_PATH = 'WWW'
IMAGE_CONFIG_PATH = 'image_config.json'
PROJECT_CONFIG_PATH = 'project_config.json'

def get_images():
    images = []
    for path in Path(IMAGE_PATH).iterdir():
        _, tail = ntpath.split(path)
        name, _ = tail.split('.')
        images.append((path, name))
    return images


def build_css():
    output = '''
body{
    background-color: beige;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
}
#canvas{    
    background: bisque;
}\n'''
    for (_, id) in get_images():
        head = '#'
        tail = '{\n    display: none;\n}\n'
        output += head + id + tail
        with open("style.css", "w") as write_file:
            write_file.write(output)
def build_html():
    head = '''
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scale_of_Geology</title>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <canvas id="canvas"></canvas>\n'''
    tail ='''
    <script src="canvas.js"></script>
    </body>
    </html>\n
    '''
    imgs = ''
    for (path, id) in get_images():
        img = '        <img src="' + str(path) + '" alt="", id="' + id + '"/>\n'
        imgs += img
    with open("index.html", "w") as write_file:
        write_file.write(head + imgs + tail)
    
def build_image_config():
    config = []
    for (_, id) in get_images():
        config.append({
            "id": id,
            "size": 0,
            "dy": 0,
            "dx": 0,
        })
    with open(IMAGE_CONFIG_PATH, "w") as write_file:
        json.dump(config, write_file, indent=4)
if __name__ == '__main__':
    build_html()
    build_css()
    build_image_config()
    
