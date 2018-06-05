This is the plan: given some points try and find a conic equation
`Q(x,y) = a * xx + b * yy + c * x + d * y + 1 = 0`
that fits the points and good as possible.

So, the user can click any number of points
(ofc having less than 5 is not really worth it),
that data is transformed into pairs (x,y).

The loss function:
I think it is gonna be `\sum Q(xi,yi)^2` or something.

Need an optimizer with a learning rate/
