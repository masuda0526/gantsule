type Store = Record<string, any>

class TempValueStore{
  store:Store

  constructor(){
    this.store = {}
  }

  put(key:string, data:any){
    this.store[key] = data;
  }

  get(key:string, isRemove:boolean=true){
    const data = this.store[key]
    // 不要なデータは削除
    if(isRemove){
      this.remove(key);
    }
    return data;
  }

  remove(key:string){
    delete this.store[key]
  }

  reset(){
    this.store = {}
  }
}
const grobalKey = "__TMP_STORE__";
export const tmpStore = (window as any)[grobalKey] ?? ((window as any )[grobalKey] = new TempValueStore());


