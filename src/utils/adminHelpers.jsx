import axios from 'axios';
import { IMAGE_BASE_URL } from '../data/constanturl';

// Use environment variable or fallback to production
export const API_BASE = IMAGE_BASE_URL;

// This is a NAMED EXPORT
export const handleDelete = async (item, section) => {
    // MySQL uses 'id', MongoDB/Static uses '_id'
    const itemId = item.id || item._id;

    if (!itemId) {
        alert("This item cannot be deleted (ID missing).");
        return;
    }

    if (window.confirm(`Are you sure you want to delete this ${section}?`)) {
        try {
            // For properties, use delete.php endpoint
            if (section === 'properties') {
                await axios.post(`${API_BASE}delete.php`, { id: itemId });
            } else {
                // For other sections (if needed in future)
                await axios.delete(`${API_BASE}${section}/${itemId}`);
            }

            alert("Deleted successfully!");

            // Reload the page to refresh the data
            window.location.reload();
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Delete failed. Make sure your backend server is running.");
        }
    }
};