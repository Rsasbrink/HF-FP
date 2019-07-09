set -e
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)
docker rmi $(docker images -q) --force

