#!/bin/bash

# Backup script for Assistencia Tecnica Database
# This script creates automated backups of PostgreSQL database

set -e

# Configuration
DB_HOST="postgres"
DB_PORT="5432"
DB_NAME="assistencia_db"
DB_USER="postgres"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="assistencia_backup_${DATE}.sql"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

echo "Starting backup process..."
echo "Date: $(date)"
echo "Database: ${DB_NAME}"
echo "Host: ${DB_HOST}"

# Create database backup
pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
    --verbose \
    --clean \
    --no-owner \
    --no-privileges \
    --format=custom \
    --file=${BACKUP_DIR}/${BACKUP_FILE}

# Compress backup
gzip ${BACKUP_DIR}/${BACKUP_FILE}
BACKUP_FILE="${BACKUP_FILE}.gz"

echo "Backup created: ${BACKUP_FILE}"

# Calculate backup size
BACKUP_SIZE=$(du -h ${BACKUP_DIR}/${BACKUP_FILE} | cut -f1)
echo "Backup size: ${BACKUP_SIZE}"

# Remove old backups (older than RETENTION_DAYS)
echo "Cleaning old backups (older than ${RETENTION_DAYS} days)..."
find ${BACKUP_DIR} -name "assistencia_backup_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete

# List current backups
echo "Current backups:"
ls -lah ${BACKUP_DIR}/assistencia_backup_*.sql.gz 2>/dev/null || echo "No backups found"

# Create backup log entry
echo "$(date): Backup completed successfully - ${BACKUP_FILE} (${BACKUP_SIZE})" >> ${BACKUP_DIR}/backup.log

echo "Backup process completed successfully!"

# Optional: Send notification (uncomment if needed)
# curl -X POST "http://notification-service:3003/api/notifications/internal" \
#   -H "Content-Type: application/json" \
#   -d "{\"type\":\"backup_completed\",\"message\":\"Database backup completed: ${BACKUP_FILE}\",\"size\":\"${BACKUP_SIZE}\"}"