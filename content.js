/*
    Document Description:

*/


// 
/*
    CONST VARIABLES

    DATA_TABLE: The course datas send by from the backend. This variable gives all the informations can be view on the screen
    COURSE_TIME_SLOT: The given table index.
    GEN_TABLE_PATTERN: The table must be generated. To let user put their wished course in it.
    TARGET_DIV: The div where table insert into it.


    GLOBAL VARIABLE
    selectClassArray: The course selected by the users. Store in the frontend.
*/

const DATA_TABLE = document.querySelector('#table1');

// 表格時間段
const COURSE_TIME_SLOT = [
    '1st 8:10~9:00',
    '2nd 9:05~9:55',
    '3rd 10:15~11:05',
    '4th 11:10~11:55',
    '14th 12:05~12:55',
    '5th 13:10~14:00',
    '6th 14:05~14:55',
    '7th 15:15~16:05',
    '8th 16:10~17:00',
    '9th 17:10~18:00',
    '10th 18:20~19:10',
    '11th 19:15~20:05',
    '12th 20:10~21:00',
    '13th 21:05~21:55'
];

const WEEKDAYS = ['Sun(日)', 'Mon(一)', 'Tue(二)', 'Wed(三)', 'Thu(四)', 'Fri(五)', 'Sat(六)'];

const GEN_TABLE_PATTERN = `

<div id="classTable">
<h2>預選課程清單</h2>
<!--<button id="genPDF" class="btn btn-info" type="button">生成PDF</button>-->
<button id="clearTable" class="btn btn-danger" type="button">清除課表</button>
<table id="preview" class="table table-bordered" style="width: 65%;>
<thead class="table-info">
    <th style="width: 50px; height: 30px;">Time</th>
    <th style="width: 50px; height: 30px;">Sun</th>
    <th style="width: 50px; height: 30px;">Mon</th>
    <th style="width: 50px; height: 30px;">Tue</th>
    <th style="width: 50px; height: 30px;">Wed</th>
    <th style="width: 50px; height: 30px;">Thu</th>
    <th style="width: 50px; height: 30px;">Fri</th>
    <th style="width: 50px; height: 30px;">Sat</th>
</thead>
<tbody>
    <tr>
        <td>1st 8:10~9:00</td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
        <td style="width: 50px; height: 30px;"></td>
    </tr>
    <tr>
        <td>2nd 9:05~9:55</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>3rd 10:15~11:05</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>4th 11:10~11:55</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>14th 12:05~12:55</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>5th 13:10~14:00</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>6th 14:05~14:55</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>7th 15:15~16:05</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>8th 16:10~17:00</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>9th 17:10~18:00</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>10th 18:20~19:10</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>11th 19:15~20:05</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>12th 20:10~21:00</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>13th 21:05~21:55</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>

</tbody>
</table>
</div>

`
const TARGET_DIV = document.querySelector(".panel.panel-info");

let selectClassArray = Array.from({ length: 14 }, () => Array(7).fill(''));

// 将 HTML 表格结构插入到目标 div 后面
if (TARGET_DIV) {
    TARGET_DIV.insertAdjacentHTML('afterend', GEN_TABLE_PATTERN);
}
generateCheckButton(DATA_TABLE);


// Select List Listener
document.querySelector('#ddl_scj_cls_id').addEventListener('change', async function () {
    await delay(1000);
    loopCheck();
});
// Submit Button Listener
document.querySelector('#form0').addEventListener('submit', async function (e) {
    e.preventDefault();
    await delay(1000);
    loopCheck();
});

// Table Clear Button Listener
document.getElementById('clearTable').addEventListener('click', function () {
    selectClassArray = Array.from({ length: 14 }, () => Array(7).fill(''));
    writeToTable();
});



// 將所選課程加入表格
function writeToTable() {
    let table = document.getElementById('preview');
    if (!table) {
        console.error('Table element not found.');
        return;
    }

    // 清空現有表格內容
    table.innerHTML = '';

    // 添加表頭
    let header = table.createTHead();
    let headerRow = header.insertRow(0);
    let timeHeader = document.createElement('th');
    timeHeader.innerText = 'Time';
    headerRow.appendChild(timeHeader);

    WEEKDAYS.forEach(day => {
        let th = document.createElement('th');
        th.innerText = day;
        headerRow.appendChild(th);
    });

    // 添加表格內容
    let tbody = table.createTBody();
    for (let row = 0; row < selectClassArray.length; row++) {
        let tr = document.createElement('tr');
        let timeSlot = document.createElement('td');
        timeSlot.innerText = COURSE_TIME_SLOT[row];
        tr.appendChild(timeSlot);

        for (const element of selectClassArray[row]) {
            let td = document.createElement('td');

            if (element['classCode'] === undefined || element['classCode'] === null) {
                td.innerText = '';
            } else {
                td.innerHTML =
                    `${element['classCode']} ${element['classOpen']}
                <br>
                ${element['chineseName']}
                <br> 
                ${element['classPlace']}`;
            }

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function sendInArray(row, col, data, disable = false) {
    if (disable === true) {
        selectClassArray[row][col] = '';
        return true;
    }
    else {
        console.log(selectClassArray[row][col] === '');
        if (selectClassArray[row][col] === '' || selectClassArray[row][col] == null) {
            selectClassArray[row][col] = data;
            return true;
        }
        else {
            alert('衝堂!\n星期' + col + '第' + (row + 1) + "節已經有課了");
            return false;
        }
    }
}

// 字串運算
function classStringHandle(courseInfo, disabled) {
    let editTable = document.getElementById('preview');
    let timeAndPlaceArr = courseInfo['timeAndPlace'].split(' ');
    let returnFlag = true;
    let timeWeek = [];
    let timeClass = [];
    let place = [];
    //console.log(timeAndPlaceArr);
    for (let i = 0; i < timeAndPlaceArr.length; i++) {
        if (i % 3 == 0) {
            timeWeek.push(timeAndPlaceArr[i]);
        }
        else if (i % 3 == 1) {
            timeClass.push(timeAndPlaceArr[i]);
        }
        else {
            place.push(timeAndPlaceArr[i]);
        }
    }

    let classNameArr = courseInfo['className'].split('\n');
    let chineseName = classNameArr[0];
    let englishName = classNameArr[2];  //不要問為什麼是2 我也想知道
    //console.log(classNameArr);


    for (let i = 0; i < timeAndPlaceArr.length / 3; i++) {
        let col = 0;
        switch (timeWeek[i]) {
            case '(日)':
                col = 0;
                break;
            case '(一)':
                col = 1;
                break;
            case '(二)':
                col = 2;
                break;
            case '(三)':
                col = 3;
                break;
            case '(四)':
                col = 4;
                break;
            case '(五)':
                col = 5;
                break;
            case '(六)':
                col = 6;
                break;
        }
        let classDurationArr = [];
        try {
            // 檢查 timeClass[i] 是否存在且為有效的字串
            // 頓號檢查
            if (timeClass[i] && typeof timeClass[i] === 'string') {
                if (timeClass[i].includes('、')) {
                    let commaArr = timeClass[i].split('、');
                    let newTimeClass = [];
                    for (const element of commaArr) {
                        if (element.includes('-')) {
                            newTimeClass.push(element);
                        } else {
                            classDurationArr.push(parseInt(element));
                        }
                    }
                    timeClass[i] = newTimeClass; // 修正這裡的賦值方式
                }

                let timeArr = timeClass[i].split('-');
                let startTime = parseInt(timeArr[0]);
                let endTime = parseInt(timeArr[1]);
                let noNeedToSplit = true;
                for (let j = startTime; j <= endTime; j++) {
                    classDurationArr.push(j);
                    noNeedToSplit = false;
                }
                if (noNeedToSplit) {
                    classDurationArr.push(parseInt(timeClass[i]));
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // 你可以在這裡添加更多錯誤處理邏輯
        }


        // Remove Data, Need Modify
        let sendData =
        {
            'classCode': courseInfo['classCode'],
            'classOpen': courseInfo['classOpen'],
            'chineseName': chineseName,
            'classPlace': place[i]
        }

        //alert(col + ' ' + rowArr + ' ' + place + ' ' + className);
        for (const element of classDurationArr) {
            let finRow = element;
            if (finRow <= 4) {
                finRow = finRow - 1;
            }
            else if (finRow == 14) {
                finRow = 4;
            }
            else if (finRow >= 5) {
                finRow = finRow;
            }

            returnFlag = sendInArray(finRow, col, sendData, disabled);
            if (!returnFlag) {
                return returnFlag;
            }
        }
    }
    writeToTable();
    return returnFlag;

}

// 增加核取框
function generateCheckButton(DATA_TABLE) {
    if (DATA_TABLE) {
        // 获取表格中的所有行
        var rows = DATA_TABLE.getElementsByTagName('tr');

        // 標頭處理
        var thRow = DATA_TABLE.getElementsByTagName('tr')[0];
        var thCell = document.createElement('th');
        thCell.textContent = '預選';
        thRow.appendChild(thCell);

        // 遍历每一行
        for (var i = 1; i < rows.length; i++) {
            // 创建一个新的单元格和复选框
            var cell = document.createElement('td');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            let contentCells = rows[i].getElementsByTagName('td')
            let contentClassCode = contentCells[1].textContent;

            // Checked already select course
            for (let r = 0; r < 14; r++) {
                for (let c = 0; c < 7; c++) {
                    let course = selectClassArray[r][c];
                    if (course['classCode'] == contentClassCode) {
                        checkbox.checked = true;
                    }
                }
            }

            // Checkbox Eventlistener
            checkbox.addEventListener('click', function (event) {
                // 获取点击的复选框所在的行
                var clickedRow = event.target.closest('tr');

                var cells = clickedRow.getElementsByTagName('td');

                // 准备要显示的信息字符串

                let data = {
                    'classCode': cells[1].textContent,
                    'classOpen': cells[2].textContent,
                    'className': cells[3].textContent,
                    'timeAndPlace': cells[11].textContent,
                }

                // 检查是否为有效的行
                if (event.target.checked) {
                    // 检查是否为有效的行
                    if (clickedRow) {
                        // 获取行中的所有单元格
                        let rt_val = classStringHandle(data, false);
                        if (!rt_val) {
                            event.target.checked = false;
                        }
                    }
                } else {
                    // 复选框取消选中时的额外逻辑
                    classStringHandle(data, true);
                }
            });

            // 将复选框添加到新的单元格
            cell.appendChild(checkbox);

            // 将新单元格添加到当前行的最后
            rows[i].appendChild(cell);
        }
    }

}

// Wait Backend Sending data
function loopCheck() {
    var DATA_TABLE = document.querySelector('#table1');
    if (DATA_TABLE) {
        console.log("Try Add");
        generateCheckButton(DATA_TABLE);
    }
    else {
        setTimeout(loopCheck, 1000);
        console.log(DATA_TABLE);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




