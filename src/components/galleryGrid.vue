<script>
/**
 * Gallery component to display images in grid mode.
 * Uses the render function to create the grid HTML stuff as it cannot be done using standard template.
 */
export default {
  name: 'GalleryGrid',
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
    colsPerRow: {
      type: Number,
      default: () => 3
    },
    // Depends on CSS grid framekork.
    // For materialize-css there are 12 cols per row
    maxColPerRow: {
      type: Number,
      default: () => 12
    }
  },
  // Render a grid with the nb of columns per rows, specified in the "colsPerRow" prop
  // eg :   colsPerRow = 3
  //        maxColPerRow = 12
  // <div class="row">
  //    <div class="col m4"><img/></div> => "m4" stands for 4units in 12 cols units (@see materialize-css grids)
  //    <div class="col m4"><img/></div>
  //    <div class="col m4"><img/></div>
  // </div>
  render: function (createElement) {
    const rows = []

    for (let i = 0; i < this.imgs.length; i += this.colsPerRow) {
      const cols = createElement('div',
        { class: 'row' },
        this.imgs.slice(i, i + this.colsPerRow).map(url => {
          return createElement('div', { class: `col s12 m${this.maxColPerRow / this.colsPerRow}` }, [
            createElement('img', { attrs: { src: url }, class: 'responsive-img' })
          ])
        })
      )

      rows.push(cols)
    }

    return createElement(
      'div',
      rows
    )
  }
}
</script>
