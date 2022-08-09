# vidOvly

A video overlay framework bundled as web-components.  You can use this out of the box by including this script:

```
<script src="https://unpkg.com/vidovly@1.0.1/dist/index.modern.js"></script>
```

Then you can define a video with overlays like this:

```
    <vidovly-container fade=2>
        <vidovly-video>
        <div slot="video" style="width: 100%; height: 100%">
          <vidovly-youtube-player id="Wt2mo8GLY6s" />
        </div>
        <div slot="overlays" style="width: 100%; height: 100%;">
          <vidovly-overlay position="10-20-25-5" time="4:6">Brisket!</vidovly-overlay>
          <vidovly-overlay position="10-80-50-5" time="10:15">Oh No! I'll be so hungry by then</vidovly-overlay>
          <vidovly-overlay position="10-90-80-5" time="20:24">
              <a style="color: #53bdeb" href="https://www.facebook.com/Smoke-House-of-the-Catskills-191502834220397/">
                Smoke House of the Catskills
              </a>
          </vidovly-overlay>
          <vidovly-overlay position="10-20-25-5" time="30:38">Caramelized Onions</vidovly-overlay>
          <vidovly-overlay position="10-35-25-5" time="32:38">Wine</vidovly-overlay>
          <vidovly-overlay position="10-50-25-5" time="34:38">Beef Stock</vidovly-overlay>
        </div>
      </vidovly-video>    </vidovly-container>
```

This defines several web-components:

### vidovly-container
The outer container around a video and the overlays. You can layout the container anyway you like and use the **vidovly-video** component within it to define the area where the video is to appear. **vidovly-container** has these optional parameters:
* **overlayStyle** a style string for the overlays
* **fade** fade time for overlays in seconds
* **fadeIn** / **fadeOut** control over fade in and out

### vidovly-video

A sub-container for the video and associated overlays.  The content should include two "slots":
* The **video** slot should include a video player such as **vidovly-video-overlay**
* The **overlay** slot should contain one or more **vidovly-overlay** components

### vidovly-youtube-player
A youtube embedded video that uses 

Parameters are:

* **id** The YouTube id of the video
* **playerVars** Any of the YouTube player options which defaults to ```{playsinline: 1, autoplay: 1, modestbranding: true, start: 0, controls: 1}```,

### vidovly-overlay
An overlay that will be display at a particular time in the video, for a particular length and at a particular relative position in the video.  Any content may appear as children.

Parameters are:
* **postion="tt:ll:ww:hh"** where tt is the top, ll is the left, ww is the width and hh is the height all in percentages of the overall height and width of the video.
* **position="start:end"** the start and end times in seconds
* **overlayStyle** a style string for the overlays
* **fade** fade time for overlays in seconds
* **fadeIn** / **fadeOut** control over fade in and out

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
