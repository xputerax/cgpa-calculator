let semesters = {
  /* sem id: course id*/
  sem_1: 1
}

function get_semester(id) {
  // return new_
}

function course_row(semester_id, course_id) {
  return `
  <tr id="course_${semester_id}_${course_id}" data-course_id="${course_id}">
    <td>${course_id}</td>
    <td><input type="text" name="credit_hour_${semester_id}_${course_id}" id="credit_hour_${semester_id}_${course_id}" class="form-control"></td>
    <td><input type="text" name="grade_${semester_id}_${course_id}" id="grade_${semester_id}_${course_id}" class="form-control"></td>
    <td><span id="gp_${semester_id}_${course_id}">0</span></td>
  </tr>
  `
}

function semester_row(semester_id) {
  return `
  <div class="row" id="semester_${semester_id}">
    <div class="col-xs-12 col-sm-12">
        <table class="semester table table-bordered table-sm">
          <thead>
              <th>Course</th>
              <th>Credit hour</th>
              <th>Numeric value of grade</th>
              <th>GP</th>
          </thead>
          <tbody data-sem_id="${semester_id}">
              ${course_row(semester_id, 1)}
              <tr id="summary_${semester_id}">
                <td>Total</td>
                <td><span id="sum_ch_${semester_id}">0</span></td>
                <td></td>
                <td><span id="sum_gp_${semester_id}">0</span></td>
              </tr>
              <tr>
              <td colspan="2">
                <button data-sem_id="${semester_id}" class="btn btn-primary form-control" id="btn_semester_${semester_id}_add_course" onclick="add_course(this)">
                  <i class="typcn typcn-plus"></i> Course
                </button>
              </td>
              <td colspan="2">
                <button data-sem_id="${semester_id}" class="btn btn-danger form-control" onclick="remove_semester(this)">
                    <i class="typcn typcn-trash"></i> Semester
                </button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
  `;
}

function add_course(e) {
  let sem_id = parseInt(e.getAttribute('data-sem_id'))
  let sem_summary_row = document.querySelector('#summary_' + sem_id)

  semesters['sem_' + sem_id] += 1;
  sem_summary_row.insertAdjacentHTML('beforebegin', course_row(sem_id, semesters['sem_' + sem_id]));
}

function add_semester(e) {
  let semesters_row = document.querySelector('#semesters')
  let sem_ids = Object.keys(semesters).map(function (val) { return parseInt(val.split('_')[1]) })
  let max_sem_id = sem_ids.length > 0 ? sem_ids[sem_ids.length - 1] : 0
  let new_sem_id = parseInt(max_sem_id) + 1

  semesters['sem_' + new_sem_id] = 1
  semesters_row.insertAdjacentHTML('beforeend', semester_row(new_sem_id))
}

function remove_semester(e) {
  let sem_id = e.getAttribute('data-sem_id')
  let selector = '#semester_' + sem_id
  let sem_row = document.querySelector(selector)
  sem_row.remove()
  delete semesters['sem_' + sem_id]
}

function calculate(e) {
  let tbodies = document.querySelectorAll('tbody')
  let sems = []

  tbodies.forEach(function (tbody, i) {
    let sem_id, course_count, courses

    sem_id = tbody.getAttribute('data-sem_id')
    course_count = semesters['sem_' + sem_id]
    courses = Array.from(tbody.children).slice(0, course_count)

    if (typeof sems[i] == 'undefined') {
      sems[i] = []
    }

    courses.forEach(function (course_tr, j) {
      let course_id = course_tr.getAttribute('data-course_id')

      let selector1 = `#credit_hour_${sem_id}_${course_id}`
      let credit_hour_input = document.querySelector(selector1)

      let selector2 = `#grade_${sem_id}_${course_id}`
      let grade_input = document.querySelector(selector2)

      let credit_hour = parseFloat(credit_hour_input.value) || 0.00
      let grade = parseFloat(grade_input.value) || 0.00

      sems[i][j] = { credit_hour, grade }
    })
  })

  let cgpa = 0.00
  let ch = 0
  let div_gpas = document.querySelector('#gpas')

  // clear previous output
  while (div_gpas.firstChild) {
    div_gpas.removeChild(div_gpas.firstChild);
  }

  sems.forEach(function (courses, i) {
    let sem_ch = 0
    let sem_gpa = 0.00

    courses.forEach(function (course, j) {
      let gp = course.credit_hour * course.grade

      sem_gpa += gp
      sem_ch += course.credit_hour
      cgpa += gp
      ch += course.credit_hour
      console.log(sem_ch, sem_gpa)
      document.querySelector(`#gp_${i+1}_${j+1}`).textContent = gp
    })

    document.querySelector('#sum_gp_' + (i+1)).textContent = sem_gpa
    document.querySelector('#sum_ch_' + (i+1)).textContent = sem_ch

    sem_gpa /= sem_ch
    console.log(sem_gpa)

    let output = document.createElement('div')
    output.textContent = `Sem ${i+1} GPA: ${sem_gpa}`
    div_gpas.appendChild(output)
  })

  cgpa /= ch
  document.querySelector('#cgpa').textContent = cgpa
  console.log(`cgpa: ${cgpa}`)
}

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

function get_sem_ids() {
  return Object.keys(semesters).map(function (val) {
    return val.split('_')[1]
  })
}