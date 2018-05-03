My 'hometask' for [delightex](https://delightex.com/) interview.
Well, I failed that one, but the task is somewhat interesting.

It goes like this:

Given a lot of rectangles which all have their bottom side on the same line,
create a broken line that outlines those rectangles.

My algorithm does the following: it takes x-coordinates of
left and right sides of each building, sorts those,
swipes them from left to right and while doing so keeps a heap with
y-coordinates of tops of those rectangles that are currently being
'intersected', so it can generate the outline at the same time.

The runtime of this algorithm lies in O(n log n), the lower bound for
possible solution runtime is clearly O(n), if the given rectangles are given
at random I can prove my solution is optimal: it can be adjusted to sort
integer-arrays. If rectangles are somehow sorted I do not really know much.
