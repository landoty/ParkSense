 top_directory="/tmp/data/vehicle_data/data"

# Get the total number of files in the directory
 total_files_v=$(find "$top_directory/vehicles/" -maxdepth 1 -type f | wc -l)
 total_files_nv=$(find "$top_directory/non-vehicles/" -maxdepth 1 -type f | wc -l)

# Calculate half the length of the directory
 half_length_v=$((total_files_v / 2))
 half_length_nv=$((total_files_nv / 2))
# Create directories for training and test sets if they don't exist
 mkdir -p "$top_directory/training/vehicles"
 mkdir -p "$top_directory/training/non-vehicles"
 mkdir -p "$top_directory/test/vehicles"
 mkdir -p "$top_directory/test/non-vehicles"

# Counter for tracking the current file iteration
 current_file=0

# Iterate over the files in the vehicles directory
 for file in "$top_directory/vehicles"/*; do
  if [ -f "$file" ]; then
   current_file=$((current_file + 1))

    # Get the file name without the path
    filename=$(basename "$file")

    if [ "$current_file" -le "$half_length_v" ]; then
      # Move the file to the training directory
      mv "$file" "$top_directory/training/vehicles/$filename"
      echo "Moved $filename to training vehicles."
    else
      # Move the file to the test directory
      mv "$file" "$top_directory/test/vehicles/$filename"
      echo "Moved $filename to test vehicles."
    fi
  fi
done

current_file=0
# Iterate over the files in the non-vehicles directory
 for file in "$top_directory/non-vehicles"/*; do
  if [ -f "$file" ]; then
   current_file=$((current_file + 1))

    # Get the file name without the path
    filename=$(basename "$file")

    if [ "$current_file" -le "$half_length_nv" ]; then
      # Move the file to the training directory
      mv "$file" "$top_directory/training/non-vehicles/$filename"
      echo "Moved $filename to training non."
    else
      # Move the file to the test directory
      mv "$file" "$top_directory/test/non-vehicles/$filename"
      echo "Moved $filename to test non."
    fi
  fi
done

 echo "Done."
