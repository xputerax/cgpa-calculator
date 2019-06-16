let semesters = {
  /* sem id: course id*/
  sem_1: 1
}

let current_semester_id = 1

function course_row(semester_id, course_id) {
  return `
  <tr id="course_${semester_id}_${course_id}">
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
      <h5 class="text-center">Semester ${semester_id}</h5>
        <table class="semester table table-bordered table-sm">
          <thead>
              <th>Course</th>
              <th>Credit hour</th>
              <th>Numeric value of grade</th>
              <th>GP</th>
          </thead>
          <tbody>
              ${course_row(semester_id, 1)}
              <tr id="summary_${semester_id}">
                <td>Total</td>
                  <td>0</td>
                  <td></td>
                  <td>0</td>
              </tr>
              <tr>
                  <td colspan="4">
                      <button data-sem_id="${semester_id}" class="btn btn-primary form-control" id="btn_semester_${semester_id}_add_course" onclick="add_course(this)">
                          <i class="typcn typcn-plus"></i> Course
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
  
  semesters[`sem_${sem_id}`] += 1;
  sem_summary_row.insertAdjacentHTML('beforebegin', course_row(sem_id, semesters[`sem_${sem_id}`]));
}

function add_semester(e) {
  let add_sem_row = document.querySelector('#row_add_semester')
  let sem_ids = Object.keys(semesters).map(function (val) {
    return parseInt(val.split('_')[1])
  })
  let max_sem_id = parseInt(Math.max(sem_ids))
  console.log(typeof max_sem_id)
  // let new_sem_id = parseInt(max_sem_id) + 1
  semesters[`sem_${max_sem_id + 1}`] = 1
  add_sem_row.insertAdjacentHTML('beforebegin', semester_row(max_sem_id + 1))
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