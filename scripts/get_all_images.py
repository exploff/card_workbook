import requests
import os

def download_image(url, destination_folder):
    filename = os.path.basename(url)
    file_path = os.path.join(destination_folder, filename)
    
    if os.path.exists(file_path):
        print(f"L'image '{filename}' est déjà présente dans le dossier. Ignorer le téléchargement.")
        return
    
    with requests.get(url, stream=True) as response:
        response.raise_for_status()
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

    print(f"Téléchargement de l'image '{filename}' terminé.")


def download_images(base_url, start_num, end_num, destination_folder, start_pattern):
    print("Downloading images...")
    for num in range(start_num, end_num + 1):
        image_name = f"{start_pattern}-{str(num).zfill(3)}.png"
        image_url = base_url + image_name
        download_image(image_url, destination_folder)
        
        possible_suffixes = ["_p1.png", "_p2.png"]
        for suffix in possible_suffixes:
            alt_image_name = f"{start_pattern}-{str(num).zfill(3)}{suffix}"
            alt_image_url = base_url + alt_image_name
            try:
                download_image(alt_image_url, destination_folder)
            except requests.exceptions.HTTPError:
                pass  # The alternative image does not exist, so continue to the next one
    print("Done!")


# ne pas oublier les ST


if __name__ == "__main__":
    base_url = "https://en.onepiece-cardgame.com/images/cardlist/card/"
    start_number = 1
    end_number = 17
    start_pattern = "ST07"
    destination_folder = "../data/images" + "/" + start_pattern

    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)
    
    download_images(base_url, start_number, end_number, destination_folder, start_pattern)
