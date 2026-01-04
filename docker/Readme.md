docker compose down
docker compose build --no-cache
docker compose up -d

Rebuild after changing binaries:
docker compose up --build -d

docker exec -it amps sh
./bin/spark publish -server localhost:9007 -topic /reference/data/instruments -file rates_instruments.json -type json