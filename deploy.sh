echo 'pulling last changes...'
git pull

echo 'building...'
gulp build

if [ "$NODE_ENV" == "production" ]; then
  echo "restarting fugitive service"
  systemctl restart fugitive
fi
