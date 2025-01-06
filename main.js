const calculatorcontainer = document.getElementById('Calculator-container');
const displayArea = document.getElementById('display-area');
// إضافة مستمع الحدث عند النقر
calculatorcontainer.addEventListener('click', (e)=>{
    // التأكد من أن العنصر الذي تم النقر عليه هو زر
   if (e.target.nodeName === 'BUTTON'){
       switch (e.target.textContent){
            case 'c':
                clear();
                break;
           case 'DEL':
               deleteOneValue();
               break;
          case '=':
           evaluate();
            break;
              default:
                    addToDisplayArea(e.target.textContent);   
       }
   }
})
// دالة لحذف المحتوى في الشاشة
function clear(){
  displayArea.textContent = "";
}
// دالة لإضافة النص إلى الشاشة
function addToDisplayArea (value){
  displayArea.textContent +=value;
}
// دالة لحذف آخر قيمة مدخلة
function deleteOneValue() {
    displayArea.textContent = displayArea.textContent.slice(0, -1);
  }

// دالة لتقييم المعادلة الرياضية (يمكنك إضافة معالج أخطاء هنا)
function evaluate() {
    try {
      displayArea.textContent = eval(displayArea.textContent);
    } catch (error) {
      displayArea.textContent = 'Error';
    }
  }
