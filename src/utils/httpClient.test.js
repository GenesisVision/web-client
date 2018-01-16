import httpClient from "./httpClient";


describe('httpClient', () => {
  describe('test public api', ()=>{
    it('tests success POST response with empty body', async () => {
      var res = new Response('', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });
  
      fetch = jest.fn(() => Promise.resolve(res));
      var response = await httpClient.post('/example.com', {});
      expect(response).toEqual('');
    });

    it('tests error POST response: Bad request', async () => {
      var res = new Response('Wrong username/password', {
        status: 400,
        headers: {
          'Content-type': 'text/plain; charset=utf-8'
        }
      });
  
      fetch = jest.fn(() => Promise.resolve(res));
      try{
      var t = await httpClient.get('/example.com', {});
      }
      catch(e){

        expect(e.message).toEqual('Wrong username/password');
      }
    });
  }); 
});