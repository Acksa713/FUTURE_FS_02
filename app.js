const API =
  "http://localhost:5000/api";

async function login() {

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  const response = await fetch(
    `${API}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const data = await response.json();

  localStorage.setItem(
    "token",
    data.token
  );

  window.location.href =
    "dashboard.html";
}

async function addLead() {

  const name =
    document.getElementById(
      "name"
    ).value;

  const email =
    document.getElementById(
      "leadEmail"
    ).value;

  const source =
    document.getElementById(
      "source"
    ).value;

  const notes =
    document.getElementById(
      "notes"
    ).value;

  await fetch(`${API}/leads`, {

    method: "POST",

    headers: {

      "Content-Type":
        "application/json",

      Authorization:
        localStorage.getItem(
          "token"
        )
    },

    body: JSON.stringify({
      name,
      email,
      source,
      notes
    })

  });

  loadLeads();
}

async function loadLeads() {

  const response =
    await fetch(`${API}/leads`, {

      headers: {

        Authorization:
          localStorage.getItem(
            "token"
          )

      }

    });

  const leads =
    await response.json();

  const leadList =
    document.getElementById(
      "leadList"
    );

  leadList.innerHTML = "";

  leads.forEach((lead) => {

    leadList.innerHTML += `
      <div class="lead">

        <h3>${lead.name}</h3>

        <p>${lead.email}</p>

        <p>${lead.source}</p>

        <p>Status:
          ${lead.status}
        </p>

        <p>${lead.notes}</p>

      </div>
    `;

  });
}

if (
  window.location.pathname.includes(
    "dashboard"
  )
) {

  loadLeads();

}