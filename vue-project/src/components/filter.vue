<template>
  <div class="checkbox-dropdown">
    Choose city
    <ul class="checkbox-dropdown-list">
      <li>
        <label> <input type="checkbox" value="Vejle" name="city" />Milwaukee</label>
      </li>
      <li>
        <label> <input type="checkbox" value="Horsens" name="city" />Denver</label>
      </li>
      <li>
        <label> <input type="checkbox" value="Kolding" name="city" />Boston</label>
      </li>
      <li>
        <label> <input type="checkbox" value="Kolding" name="city" />LA</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      //         $(".checkbox-dropdown").click(function () {
      //     $(this).toggleClass("is-active");
      // });
      // $(".checkbox-dropdown ul").click(function(e) {
      //     e.stopPropagation();
      // });
    }
  }
}
</script>

<style>
.checkbox-dropdown {
  width: 200px;
  border: 1px solid #aaa;
  padding: 10px;
  position: relative;
  margin: 0 auto;

  user-select: none;
}

/* Display CSS arrow to the right of the dropdown text */
.checkbox-dropdown:after {
  content: '';
  height: 0;
  position: absolute;
  width: 0;
  border: 6px solid transparent;
  border-top-color: #000;
  top: 50%;
  right: 10px;
  margin-top: -3px;
}

/* Reverse the CSS arrow when the dropdown is active */
.checkbox-dropdown.is-active:after {
  border-bottom-color: #000;
  border-top-color: #fff;
  margin-top: -9px;
}

.checkbox-dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%; /* align the dropdown right below the dropdown text */
  border: inherit;
  border-top: none;
  left: -1px; /* align the dropdown to the left */
  right: -1px; /* align the dropdown to the right */
  opacity: 0; /* hide the dropdown */

  transition: opacity 0.4s ease-in-out;
  height: 100px;
  overflow: scroll;
  overflow-x: hidden;
  pointer-events: none; /* avoid mouse click events inside the dropdown */
}
.is-active .checkbox-dropdown-list {
  opacity: 1; /* display the dropdown */
  pointer-events: auto; /* make sure that the user still can select checkboxes */
}

.checkbox-dropdown-list li label {
  display: block;
  border-bottom: 1px solid silver;
  padding: 10px;

  transition: all 0.2s ease-out;
}

.checkbox-dropdown-list li label:hover {
  background-color: #555;
  color: white;
}
</style>
