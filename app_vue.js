let semesters = {
  /* sem id: course id*/
  sem_1: 1
}

Vue.component('semester-table', {
  props: ['id'],
  data () {
    return {
      courses: []
    }
  },
  methods: {
    add_course () {
      console.log(this)
      // console.log('adding course...')
    }
  },
  template: `
  <table class="table table-bordered table-sm" v-on:add-course="add_course">
    <thead>
      <th>Course</th>
      <th>Credit hour</th>
      <th>Numeric value of grade</th>
      <th>GP</th>
    </thead>
    <tbody>
      <semester-course-tr id="1"></semester-course-tr>
      <semester-summary-tr></semester-summary-tr>
      <semester-controls-tr></semester-controls-tr>
    </tbody>
  </table>`
})

Vue.component('semester-course-tr', {
  props: ['id'],
  data: function () {
    return {
      credit_hour: 0,
      grade: 0
    }
  },
  computed: {
    gp_string: function () {
      return `${this.credit_hour}*${this.grade}`
    },
    gp: function () {
      return this.credit_hour * this.grade
    }
  },
  template: `
  <tr>
    <td>{{ id }}</td>
    <td><input type="text" class="form-control" v-model="credit_hour"></td>
    <td><input type="text" class="form-control" v-model="grade"></td>
    <td><span>{{ gp_string + '=' + gp }}</span></td>
  </tr>`
})

Vue.component('semester-summary-tr', {
  template: `
  <tr>
    <td>Total</td>
    <td>0</td>
    <td></td>
    <td>0</td>
  </tr>
  `
})

Vue.component('semester-controls-tr', {
  methods: {
    handleClick () {
      // this.$emit('add-course')
      // console.log()
      console.log(this.$parent.add_course())
    }
  },
  template: `
  <tr>
    <td colspan="4">
      <button class="btn btn-primary form-control" @click="handleClick">
        <i class="typcn typcn-plus"></i> Course
      </button>
    </td>
  </tr>`
})

Vue.component('controls', {
  template: `
  <div>
    <button class="btn btn-primary form-control">
      <i class="typcn typcn-plus"></i> Test
    </button>
  </div>`
})

var app = new Vue({
  el: '#app',
  data () {
    return {
      semesters: [
        {
          credit_hour: 0,
          grade: 0
        }
      ]
    }
  },
  methods: {
    add_course: function () {
      console.log('add course')
    },
    add_semester: function () {

    },
    calculate: function () {

    },
    test: function () {

    }
  }
})

// function get_semester(id) {
//   // return new_
// }

// function course_row(semester_id, course_id) {
//   return `
//   <tr id="course_${semester_id}_${course_id}">
//     <td>${course_id}</td>
//     <td><input type="text" name="credit_hour_${semester_id}_${course_id}" id="credit_hour_${semester_id}_${course_id}" class="form-control"></td>
//     <td><input type="text" name="grade_${semester_id}_${course_id}" id="grade_${semester_id}_${course_id}" class="form-control"></td>
//     <td><span id="gp_${semester_id}_${course_id}">0</span></td>
//   </tr>
//   `
// }

// function semester_row(semester_id) {
//   return `
//   <div class="row" id="semester_${semester_id}">
//     <div class="col-xs-12 col-sm-12">
//         <table class="semester table table-bordered table-sm">
//           <thead>
//               <th>Course</th>
//               <th>Credit hour</th>
//               <th>Numeric value of grade</th>
//               <th>GP</th>
//           </thead>
//           <tbody data-sem_id="${semester_id}">
//               ${course_row(semester_id, 1)}
//               <tr id="summary_${semester_id}">
//                 <td>Total</td>
//                   <td>0</td>
//                   <td></td>
//                   <td>0</td>
//               </tr>
//               <tr>
//               <td colspan="2">
//                 <button data-sem_id="${semester_id}" class="btn btn-primary form-control" id="btn_semester_${semester_id}_add_course" onclick="add_course(this)">
//                   <i class="typcn typcn-plus"></i> Course
//                 </button>
//               </td>
//               <td colspan="2">
//                 <button data-sem_id="${semester_id}" class="btn btn-danger form-control" onclick="remove_semester(this)">
//                     <i class="typcn typcn-trash"></i> Semester
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//       </table>
//     </div>
//   </div>
//   `;
// }

// function add_course(e) {
//   let sem_id = parseInt(e.getAttribute('data-sem_id'))
//   let sem_summary_row = document.querySelector('#summary_' + sem_id)

//   semesters['sem_' + sem_id] += 1;
//   sem_summary_row.insertAdjacentHTML('beforebegin', course_row(sem_id, semesters['sem_' + sem_id]));
// }

// function add_semester(e) {
//   let semesters_row = document.querySelector('#semesters')
//   let sem_ids = Object.keys(semesters).map(function (val) { return parseInt(val.split('_')[1]) })
//   let max_sem_id = sem_ids.length > 0 ? sem_ids[sem_ids.length - 1] : 0
//   let new_sem_id = parseInt(max_sem_id) + 1

//   semesters['sem_' + new_sem_id] = 1
//   semesters_row.insertAdjacentHTML('beforeend', semester_row(new_sem_id))
// }

// function remove_semester(e) {
//   let sem_id = e.getAttribute('data-sem_id')
//   let selector = '#semester_' + sem_id
//   let sem_row = document.querySelector(selector)
//   sem_row.remove()
//   delete semesters['sem_' + sem_id]
// }

// function calculate(e) {
//   // let semesters_parent = document.querySelector('#semesters')
//   // let semesters_list = semesters_parent.children
//   // let semesters_count = semesters_parent.childElementCount
//   // let i, sem;

//   // for (i=0; i<=semesters_count; i++) {
//   //   sem = semesters_list[i]
//   // }
//   let sem_ids = get_sem_ids()
//   let tbodies = document.querySelectorAll('tbody')
//   let sem_id, sem_count, courses

//   tbodies.forEach(function (tbody, i) {
//     sem_id = tbody.getAttribute('data-sem_id')
//     sem_count = semesters['sem_' + sem_id]
//     courses = Array.from(tbody.children).slice(sem_count)

//   })

//   // sem_ids.forEach(function(id, i) {
//   //   // break;
//   // })
// }

function test(e) {
  console.log(semesters)
}

/**
 * Ref: https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
 */
function extend(obj, src) {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
}

// function get_sem_ids() {
//   return Object.keys(semesters).map(function (val) {
//     return val.split('_')[1]
//   })
// }