# js13k2021

## general
- [x] time
- [ ] progress bar for black hole
- [x] pause
- [ ] ~~speed 0.5x, 1x, 2x, 5x~~
- [x] auto-pause toggle
- [x] full screen toggle
- [x] restart level
- [ ] drag from center of object, not cursorDownPosition
- [x] rotation
- [x] "rotation follows trajectory" toggle
- [ ] logic to check objects that moved from their original orbit
- [x] win condition
- [ ] lose condition (if any)
- [ ] use a multiplier for correction cost for bigger objects
- [ ] limit drag to avaiable correction budget
- [x] levels should include zoom too

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
- [x] adaptive font size
- [-] pad the screen to the middle

## gfx
- [x] background
- [x] more background palettes
- [ ] sticky
- [ ] "falling into black hole" fade
- [ ] dashed line for path
- [ ] ~~separate line for altered path preview~~
- [x] win screen
- [ ] transition
- [x] black hole

## elements
- [ ] goo to slow down
- [ ] thing that should not be destroyed
  - [ ] space dog
  - [ ] red guy
  - [ ] space invader
- [ ] thing that should be destroyed last
- [ ] powerups
- [ ] sentinels with viewing cone
- [ ] black hole destroyer rocket

## achievements

## leaderboards

## internals
- [ ] Array<Float32> instead of Vec2D? maybe?
- [ ] move functions out of class files
- [ ] consts uppercase?
- [ ] character sequences instead of emojis for emojis?
- [ ] radius instead of diameter
- [ ] pre-rendered images instead of emojis? (when devicePixelRatio != 1 custom emojis might fail)

## reducing size
- [ ] remove one of the directions in "prompt user to rotate phone"
