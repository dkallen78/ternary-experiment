# [Analog Balanced Ternary Clock](https://dkallen78.github.io/ternary-experiment/balanced-ternary-clock.html)

## What is ternary?

Ternary is a base 3 number system, so instead of counting 
`0, 1, 2, 3, 4, 5, 6, 7, 8, 9` 
you count 
`0, 1, 2, 10, 11, 12, 20, 21, 22, 100` 

## What is balanced ternary?

Balanced ternary is a base 3 system but instead of using the values 0, 1, and 2 for its digits, it uses -1, 0, and 1, usually expressed as T, 0, 1 (the "T" kind of looks like an inverted 1, get it?). So, counting up to 9 in balanced ternary looks like this: 
`0, 1, 1T, 10, 11, 1TT, 1T0, 1T1, 10T, 100`
so instead of rendering 5 as 12 (1 * 3<sup>1</sup> + 2 * 3<sup>0</sup>) you render it as 1TT (1 * 3<sup>2</sup> + -1 * 3<sup>1</sup> + -1 * 3<sup>0</sup>)

## How does this clock work?

While you could convert the standard time into balanced ternary digits, that's boring and it's working backwards from the time we keep to a different number system. Instead, I wanted to work forward from balanced base 3 numbers. That meant abandoning the division of the day into 24 hours of 60 minutes and 60 seconds. Instead I divided the day into 3<sup>11</sup> (177,147) "seconds" which translates to roughly 487.73 milliseconds per "second." So, this clock counts off these "seconds" in a 12-digit number, but I use an original set of glyphs to represent T, 0, and 1.

## What glyphs do you use for your numbers?

The convention of using a "T" to denote -1 works backwards from the system we already use, so I wanted to use a system that was a bit more primal and intuitive. I use ▽, ○, and △. Each progressive digit gets a bit larger than the last giving the effect of a mandala or sigil. There's no easy way to show this in ASCII or Unicode, but with SVG it's pretty straight forward.

## How did you get those buttery smooth `path` transition animations?

This bit was actually a pain in the ass. For `path` to animate via CSS transitions the state transitioned to needs to have the exact same number of commands in its `d` attribute. I initially tried using the `A` arc command, but to draw a straight line with an arc you need a radius of 0 and SVG arcs get squirly when transitioning from 0 to >0 so that didn't work. What I ended up using was cubic Bezier curves with the `C` command. You cannot exactly replicate an arc with a Bezier curve but you can get close and [there's math for it](https://www.researchgate.net/publication/265893293_APPROXIMATION_OF_A_CUBIC_BEZIER_CURVE_BY_CIRCULAR_ARCS_AND_VICE_VERSA). To draw a straight line with Bezier curves you just need your control points to be on the start and end points of the curve. So I draw everything with the same number of Bezier curves and the transitions work flawlessly.

## Other design choices

I gave the smallest digit a solid red infill so it would be evocative of a beating heart as it transitions. I gave subsequent digits progressively less opacity so that you can fully see the underlying/larger digits. The outermost/largest digits have the thickest stroke because it looks good, but it gets progressively smallerfor smaller digits so you can more clearly see the individual digits.