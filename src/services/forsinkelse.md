```
const axiosGetFetcher = <T>(url: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
               api.get<T>(url)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
        }, 1000);
    });
};

// Brukes av omposteringer, oppdrag og treffliste for å kunne sende med fnr i requestbody
const axiosPostFetcher = <T>(url: string, body: { gjelderId?: string; fagGruppeKode?: string }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            api.post<T>(url, body)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
        }, 1000);
    });
}
```
