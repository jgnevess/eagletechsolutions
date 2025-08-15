using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.http
{
    public class ClientHttp
    {
        private readonly HttpClient _http;

        public ClientHttp()
        {
            _http = new HttpClient();
        }

        public async Task<T> Buscar<T>(string url)
        {
            try
            {
                var res = await _http.GetFromJsonAsync<T>(url);
                return res != null ? res : throw new Exception("");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<HttpResponseMessage> Enviar<T>(string url, T dados, string apikey)
        {
            _http.DefaultRequestHeaders.Clear();
            _http.DefaultRequestHeaders.Add("X-goog-api-key", apikey);
            return await _http.PostAsJsonAsync(url, dados);
        }
    }
}