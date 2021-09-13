# js13k2021

## general
- [x] time
- [x] progress bar for black hole
- [x] pause
- [ ] ~~speed 0.5x, 1x, 2x, 5x~~
- [x] auto-pause toggle
- [x] full screen toggle
- [x] restart level
- [x] drag from center of object, not cursorDownPosition
- [x] rotation
- [x] "rotation follows trajectory" toggle
- [ ] ~~logic to check objects that moved from their original orbit~~
- [x] win condition
- [x] lose condition (if any)
- [ ] ~~use a multiplier for correction cost for bigger objects~~
- [ ] limit drag to avaiable correction budget
- [x] levels should include zoom too
- [x] tutorial
- [x] make ticks independent of frames
- [ ] simplify scoring
- [ ] player name input
- [ ] networking
  - [ ] name change
  - [ ] score submit
  - [ ] leaderboard fetch

## ui
- [ ] black hole grows? only gfx? something else?
- [x] only draw drag line when dragging
- [x] status bar with date, etc.
- [x] tooltip
- [x] prompt user to rotate phone
- [ ] toolbar
  - [x] pause (unpauses autopause as well)
  - [ ] ~~speed 0.5x, 1x, 2x, 5x~~
  - [ ] ~~autopause enabled~~
  - [x] restart level
  - [x] next level
  - [ ] mute
- [x] adaptive font size
- [-] pad the screen to the middle
- [/] tutorial texts
- [ ] intro text
- [ ] win screen
  - [ ] texts
  - [ ] scores
  - [ ] "retry" button
  - [ ] leaderboard
- [ ] title screen / main menu
- [ ] loading screen
- [x] score popping up when an object falls into black hole
- [x] only show correction amount when dragging something
- [x] ~~object name and~~ points in the tooltip popup
- [ ] more variations of "ok" for the tutorial button
- [x] pet the dog
- [x] don't show "paused - autopaused" when autopausing while paused
- [x] don't show "+0"
- [ ] show level number
- [ ] tweet on win
- [ ] tweet about petting the dog

## gfx
- [x] background
- [x] more background palettes
- [ ] sticky
- [ ] "falling into black hole" fade
- [ ] ~~dashed line for path~~
- [ ] ~~separate line for altered path preview~~
- [x] win screen
- [ ] transition
- [x] black hole

## accessibility
- [ ] high contrast mode

## elements
- [ ] goo to slow down
- [ ] thing that should not be destroyed
  - [x] space dog
  - [ ] red guy
  - [ ] space invader
- [ ] thing that should be destroyed last
- [ ] powerups
- [x] sentinels with viewing cone
- [x] black hole destroyer rocket

## music
- [ ] add some?

## sounds
- [x] selecting an object
- [x] releasing an object
- [x] object swallowed by black hole
- [ ] UI sounds?

## achievements

## leaderboards

## internals
- [ ] Array<Float32> instead of Vec2D? maybe?
- [ ] move functions out of class files
- [x] consts uppercase?
- [ ] character sequences instead of emojis for emojis?
- [ ] radius instead of diameter
- [x] pre-rendered images instead of emojis? (when devicePixelRatio != 1 custom emojis might fail)

## reducing size
- [ ] remove one of the directions in "prompt user to rotate phone"

## bugs

Chrome on iPhone
- [x] emojis not rendering at all - https://github.com/mozilla/twemoji-colr/issues/50
- [x] pull-to-refresh is not prevented - https://stackoverflow.com/a/57215061
- [ ] css media query is not updating ("rotate phone")
- [x] win screen: blur is not working
- [ ] win screen: buttons are not working?
- [x] prerendering stuffs before twemoji is loaded - https://stackoverflow.com/a/32292880/460571
- [ ] full screen button is not working
