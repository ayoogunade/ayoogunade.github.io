# Project Grid

<!-- this creates a grid with 3 columns -->
::::{grid} 3

<!-- these cards create differnt types, a tip is to look at how this renders
then decide how you want to edit -->
:::{grid-item-card} Title

body of a plain card
+++
footer
:::
<!-- the ::: starts and ends the card -->
<!-- the +++ separates body from footer -->

:::{grid-item-card} Title 2
Header card
^^^
body 2
+++
footer2
:::


:::{grid-item-card} An image with text
Header card
^^^
![NSBE 50 host region NSBE icon](_static/img/nsbe_profile_3.png)
We're in R3. This card has no footer

:::

:::{grid-item-card} Header image
:img-top: _static/img/nsbe_profile_3.png

body below image
+++
footer2
:::



::::
<!-- 4 : started the grid, so 4 closes it -->
<!--  Docs:
https://sphinx-design.readthedocs.io/en/latest/grids.html#placing-a-card-in-a-grid -->

<!-- Example card -->

<!-- 
:::{grid-item-card} Header image
:img-top: _static/img/nsbe_profile_3.png

body below image
+++
footer2
::: 
-->