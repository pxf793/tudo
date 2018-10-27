(function(window,Vue){

    new Vue({
        el:'#app',
        data:{
            dataList: JSON.parse(window.localStorage.getItem('dataList'))|| [],
            newTodo:''
        },
        //方法
        methods:{
            addTodo(){
                // console.log('chufa');
                if(!this.newTodo.trim()) return
                const obj = {
                    content:this.newTodo.trim(),
                    isFinish:false,
                    id:this.dataList.length ? this.dataList.sort((a,b) => a.id - b.id)[this.dataList.length - 1]['id']+1:1
                }
                this.dataList.push(obj);
                this.newTodo = '';
            },
            delTodo(index){
                this.dataList.splice(index,1)
            },
            //删除所有
            delAll(){
                //把没选中的筛选出来重新赋值
                this.dataList = this.dataList.filter(item => !item.isFinish)
            }
        },
        // 自定义属性
        directives:{
            focus:{ 
                inserted(el){
                    el.focus()
                }
            }
        },
        //监听
        watch:{
            //完整的书写形式
            dataList:{
                handler(newArr){
                    // console.log(newArr);
                    window.localStorage.setItem('dataList',JSON.stringify(newArr))
                    
                },
                //深度监听
                deep:true
            }
        },
        //计算属性
        computed: {
            activeNum(){
                return this.dataList.filter((item)=> !item.isFinish).length
            },
            toggleAll:{
                // return this.dataList.every(item => item.isFinish)
                get(){
                return this.dataList.every(item => item.isFinish)

                },
                set(val){
                    console.log(val);
                    
                    this.dataList.forEach(item => item.isFinish = val)
                }

            }

        }
    })





})(window,Vue);