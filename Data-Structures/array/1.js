/**
 * 创建一个记录学生成绩的对象,提供一个添加成绩的方法,以及一个显示学生平均成绩的方法
 */

 const Grade = class {
     constructor(){
         this.dataStore = []
     }

     add(name,grades){
        this.dataStore.push({
            name,
            grades
        })
     }

     average(){
         this.dataStore.forEach(item => {
             const _average = item.grades.reduce((prev,curr)=>prev+curr)/item.grades.length
             console.log(item.name + ' : ' + _average)
         })
     }

 }

 const grade = new Grade()
 grade.add('张三',[10,12,11])
 grade.add('李四',[15,10,5])

 grade.average()
