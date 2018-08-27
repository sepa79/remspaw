curl -XDELETE http://127.0.0.1:9200/producenci
curl -XPUT http://127.0.0.1:9200/producenci

curl -XDELETE http://127.0.0.1:9200/urzadzenia
curl -XPUT http://127.0.0.1:9200/urzadzenia

curl -XDELETE http://127.0.0.1:9200/dane_klientow
curl -XPUT http://127.0.0.1:9200/dane_klientow

curl -XDELETE http://127.0.0.1:9200/naprawa_spawarek
curl -XPUT http://127.0.0.1:9200/naprawa_spawarek

curl -XDELETE http://127.0.0.1:9200/zmienne
curl -XPUT http://127.0.0.1:9200/zmienne
