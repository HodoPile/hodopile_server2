import { DEFAULT_ERROR_MESSAGE } from "./constants.js";

export function handleError(msg = DEFAULT_ERROR_MESSAGE) {
    const alertContainer = document.Element("div");
    alertContainer.className = "";
    alert.Container.setAttribute("role", "alert"); 

    alertContainer.innerHTML = `
            <strong>${msg}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
    document.body.prepend(alertContainer);
}

export function handleCustomError(err) {
    handleError(err.message);
}