
class ProfessionalService{
    static _frag = "profissional"

    static async GetProfessional(filter="" ,page=0,pageSize=25,orderBy="") {
        try {
            const response = await fetch('https://localhost:5001/api/'+this._frag+ "?"+ new URLSearchParams({
                filter,
                page,
                pageSize,
                orderBy
            }).toString(), {
              method: 'Get',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            const data = await response.json();
            return data.values
          } catch (err) {
            console.log(err)
          }
          return null
    }

    static async AddProfessional(prof) {
        try {
            const body =JSON.stringify({
                name:prof.name,
                userName:prof.username,
                jobPosition:prof.JobPosition,
                permission:prof.Permission,
                phone:prof.phone,
              })
            const response = await fetch('https://localhost:5001/api/'+this._frag, {
              method: 'Post',
              headers: {
                'Content-Type': 'application/json',
              },
              body:body
            });
            if(response.ok) return response.text()
          } catch (err) {
            console.log(err)
          }
          return null
    }

    static async ResetPasswordProfessional(id) {
      try {
          const response = await fetch('https://localhost:5001/api/'+this._frag+"/resetpassword/"+id, {
            method: 'Put',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if(response.ok) return response.text()
        } catch (err) {
          console.log(err)
        }
        return null
  }

    static async UpdateProfessional(prof) {
        try {
            const response = await fetch('https://localhost:5001/api/'+this._frag, {
              method: 'Put',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                id:prof.id,
                name:prof.name,
                userName:prof.username,
                jobPosition:prof.JobPosition,
                permission:prof.Permission,
                phone:prof.phone,
              })
            });
            return response.ok
          } catch (err) {
            console.log(err)
          }
          return null
    }

    static async DeleteProfessional(id) {
        try {
            const response = await fetch('https://localhost:5001/api/'+this._frag+"/"+id, {
              method: 'Delete',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            return response.ok;
          } catch (err) {
            console.log(err)
          }
          return null
    }
}

export default ProfessionalService;

// entendi q vai juntar as odds num grafico, mas ja tem ideia de como vai ser o grafico
    //
        //
    //
//
    //
        //
    //
        //
    //
        //
    //
// 
    // 
// 