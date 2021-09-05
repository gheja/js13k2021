# js13k2021

## general
- [x] time
- [ ] progress bar for black hole
- [ ] pause
- [ ] speed 0.5x, 1x, 2x, 5x
- [ ] auto-pause toggle
- [ ] full screen toggle
- [ ] restart level
- [ ] drag from center of object, not cursorDownPosition
- [x] rotation
- [x] "rotation follows trajectory" toggle
- [ ] logic to check objects that moved from their original orbit
- [/] win condition
- [ ] lose condition (if any)

## ui
- [ ] black hole grows? only gfx? something else?
- [ ] only draw drag line when dragging
- [x] status bar with date, etc.
- [x] tooltip
- [ ] prompt user to rotate phone
- [ ] toolbar
  - [ ] pause (unpauses autopause as well)
  - [ ] speed 0.5x, 1x, 2x, 5x
  - [ ] autopause enabled
  - [ ] restart level
  - [ ] next level
- [ ] adaptive font size

## gfx
- [ ] background
- [ ] sticky
- [ ] "falling into black hole" fade
- [ ] dashed line for path
- [ ] separate line for altered path preview
- [ ] win screen
- [ ] transition

## elements
- [ ] goo to slow down
- [ ] thing that should not be destroyed
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
