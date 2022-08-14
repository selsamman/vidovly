# vidOvly

A video overlay framework bundled as web-components which lets you define overlays to be applied over a video using markup much like this:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Video Overlay</title>
  </head>
  <body>
  
    <div style="height: 200px; width: 800px">
      <vidovly-container>
        <div style="flex-direction: row;width: 100%; height: 100%;display: flex;">
          <div style="flex: 2;font-size: 1em">
            <vidovly-html>
              <vidovly-toc>
                <vidovly-entry time="0">Intro</vidovly-entry>
                <vidovly-entry time="0:15">Preparation</vidovly-entry>
                <vidovly-entry time="2:07">Smoking</vidovly-entry>
                <vidovly-entry time="3:50">Carving</vidovly-entry>
                <vidovly-entry time="5:01">Serve</vidovly-entry>
              </vidovly-toc>
            </vidovly-html>
          </div>
          <div style="flex: 8;align-items: stretch">
            <vidovly-video fade=2>
              <div slot="video" style="width: 100%; height: 100%">
                <vidovly-youtube-player id="Wt2mo8GLY6s" />
              </div>
              <div slot="overlays" style="width: 100%; height: 100%;">
                <vidovly-overlay position="10-20-25-5" time="0:4-0:6">Brisket!</vidovly-overlay>
                <vidovly-overlay position="10-80-50-5" time="0:10-0:15">Oh No! I'll be so hungry by then</vidovly-overlay>
                <vidovly-overlay position="10-90-80-5" time="0:20-0:24">
                  <a style="color: #53bdeb" href="https://www.facebook.com/Smoke-House-of-the-Catskills-191502834220397/">
                    Smoke House of the Catskills
                  </a>
                </vidovly-overlay>
                <vidovly-overlay position="10-20-25-5" time="0:30-0:38">Caramelized Onions</vidovly-overlay>
                <vidovly-overlay position="10-35-25-5" time="0:32-0:38">Wine</vidovly-overlay>
                <vidovly-overlay position="10-50-25-5" time="0:34-0:38">Beef Stock</vidovly-overlay>
                <vidovly-overlay position="10-80-50-5" time="2:40-2:45">Don't Burn the House Down</vidovly-overlay>
                <vidovly-overlay position="10-80-50-5" time="3:48-3:50">The Waiting is the hardest part</vidovly-overlay>
                <vidovly-overlay position="10-80-50-5" time="5:03-5:8">Man that looks good</vidovly-overlay>
                <vidovly-overlay fade=".1" position="00-00-100-100" time="5:12-999:0" overlaystyle="background-color: white;">
                  <div style="margin-top: 20%;text-align: center;color: black;font-size: 8em;font-family: sans-serif">The End</div>
                </vidovly-overlay>
              </div>
            </vidovly-video>
          </div>
        </div>
      </vidovly-container>
    </div>

    <script src="https://unpkg.com/vidovly@1.0.2/dist/index.umd.js"></script>
  
  </body>
</html>
```
You can use this script directly from unpkg.com to define the web-components.  It must come after the web-components are defined.

```
<script src="https://unpkg.com/vidovly@1.0.2/dist/index.umd.js"></script>
```
> Always check for latest version on NPM

The script creates these web-components which use preact under the covers:

### vidovly-container
The outer container around a video and the overlays. You can layout the container anyway you like and use the 
* **vidovly-video** component within it to define the area where the video is to appear.
* **vidovly-html** container to define html content where you want variable content to appear based on time such as a table of contents



### vidovly-video

A sub-container for the video and associated overlays.  The content should include two "slots":
* The **video** slot should include a video player such as **vidovly-video-overlay**
* The **overlay** slot should contain one or more **vidovly-overlay** components

**vidovly-video** has these optional parameters:
* **overlayStyle** a style string for the overlays
* **fade** fade time for overlays in seconds
* **fadeIn** / **fadeOut** control over fade in and out

### vidovly-youtube-player
A youtube embedded video that uses 

Parameters are:

* **id** The YouTube id of the video
* **playerVars** Any of the YouTube player options which defaults to ```{playsinline: 1, autoplay: 1, modestbranding: true, start: 0, controls: 1}```,

### vidovly-overlay
An overlay that will be display at a particular time in the video, for a particular length and at a particular relative position in the video.  Any content may appear as children.

Parameters are:
* **postion="tt:ll:ww:hh"** where tt is the top, ll is the left, ww is the width and hh is the height all in percentages of the overall height and width of the video.
* **time="start:end"** the start and end times in mm:ss format
* **overlayStyle** a style string for the overlays
* **fade** fade time for overlays in seconds
* **fadeIn** / **fadeOut** control over fade in and out

### vidovly-html
A container for hmtl or ***vidovly-toc*** components for defining a table of content. It has these parameters
* **commonstyle** a style string to serve as default for sub-elements

### vidovly-toc
A container for a table of contents.  It has these parameters
* **commonstyle** the style in common for active and inactive entries
* **inactivestyle** the style for content that is not active because it is not with the time boundary
* * **activestyle** the style for content that is  active because it is with the time boundary
Not the time boundary is defined in descendent **vidovly-toc-entry** components

### vidovly-toc-entry
A table of content entry which can be styled based on whether the time in the video matches the time parameter.  It has these parameters
* **commonstyle** the style in common for active and inactive entries
* **inactivestyle** the style for content that is not active because it is not with the time boundary
* * **activestyle** the style for content that is  active because it is with the time boundary
* * **time="start:end"** the start and end times in mm:ss format

### Applying styles
Although web-components use a shadow dom the stylable content is inserted using slots such that all of the html content (not the web-components themselves) are part of the page DOM and as such may be styled as usual.  You may also apply styles to the overlay.  The default style is:
```font-size: 1em; color: white; font-family: sans-serif; text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;```

## Contributions

Contributions are always welcome in the form of pull requests.   Some desired features are:
* An HTML5 video player
* web-components for creating navigation elements



## CLI Commands for those forking the project

``` bash
# install dependencies
npm install

# serve demo with hot reload at localhost:8080
npm run dev

# bundle distro js including preact
npm run build:widget

# lint the project with eslint to find code style issues
npm run lint

# run tests with jest and enzyme
npm run test
```
