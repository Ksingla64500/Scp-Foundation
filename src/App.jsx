import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [records, setRecords] = useState([]);
  const [view, setView] = useState('home');
  const [selecteditem, setSelecteditem] = useState(null);
  const [form, setForm] = useState({ item: '', class: '', description: '', containment: '', image: '' });

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    const { data, error } = await supabase.from('Scp foundation').select();
    if (!error) setRecords(data);
  }

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await supabase.from('Scp foundation').insert([form]);
    fetchRecords();
    setForm({ item: '', class: '', description: '', containment: '', image: '' });
  }

  async function handleDelete(id) {
    await supabase.from('Scp foundation').delete().eq('id', id);
    fetchRecords();
  }

  async function handleEdit(id) {
    await supabase.from('Scp foundation').update(form).eq('id', id);
    fetchRecords();
    setForm({ item: '', class: '', description: '', containment: '', image: '' });
  }

  return (
    <div className="app">
      {view === 'home' && (
        <div>
          <nav>
            <h1>SCP FOUNDATION</h1>
            <div className="scp-buttons">
              {records
                .sort((a, b) => a.id - b.id)
                .map((rec, index) => (
                  <button
                    key={rec.id}
                    className={`scp-btn color-${index % 5}`}
                    onClick={() => {
                      setSelecteditem(rec);
                      setView('detail');
                    }}
                  >
                    {rec.item}
                  </button>
                ))}
              <button onClick={() => setView('admin')} className="admin-btn">
                Admin
              </button>
            </div>
          </nav>
          <div className="home-background"></div>
        </div>
      )}

      {view === 'detail' && selecteditem && (
        <div className="detail">
          <h2>{selecteditem.item}</h2>
          <h4>{selecteditem.class}</h4>
          <img src={selecteditem.image} alt={selecteditem.item} />
          <p>{selecteditem.description}</p>
          <p>{selecteditem.containment}</p>

          <div className="navigation-buttons">
            <button
              onClick={() => {
                const currentIndex = records.findIndex((r) => r.id === selecteditem.id);
                if (currentIndex > 0) {
                  setSelecteditem(records[currentIndex - 1]);
                }
              }}
              disabled={records.findIndex((r) => r.id === selecteditem.id) === 0}
              className="nav-btn"
            >
              Previous
            </button>

            <button onClick={() => setView('home')} className="nav-btn back-btn">
              Back to Home
            </button>

            <button
              onClick={() => {
                const currentIndex = records.findIndex((r) => r.id === selecteditem.id);
                if (currentIndex < records.length - 1) {
                  setSelecteditem(records[currentIndex + 1]);
                }
              }}
              disabled={records.findIndex((r) => r.id === selecteditem.id) === records.length - 1}
              className="nav-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {view === 'admin' && (
        <div className="admin">
          <h2>Admin Panel</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Class</th>
                <th>Description</th>
                <th>Containment</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.item}</td>
                  <td>{rec.class}</td>
                  <td>{rec.description}</td>
                  <td>{rec.containment}</td>
                  <td>
                    <img src={rec.image} alt="" width="50" />
                  </td>
                  <td>
                    <button onClick={() => setForm(rec)}>Edit</button>
                    <button onClick={() => handleDelete(rec.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="form">
            <input name="item" value={form.item} onChange={handleInputChange} placeholder="Item" />
            <input name="class" value={form.class} onChange={handleInputChange} placeholder="Class" />
            <input name="description" value={form.description} onChange={handleInputChange} placeholder="Description" />
            <input name="containment" value={form.containment} onChange={handleInputChange} placeholder="Containment" />
            <input name="image" value={form.image} onChange={handleInputChange} placeholder="Image URL" />
            {form.id ? (
              <button onClick={() => handleEdit(form.id)}>Update</button>
            ) : (
              <button onClick={handleSubmit}>Create</button>
            )}
          </div>

          <button onClick={() => setView('home')} style={{ marginTop: '1.5rem' }}>
            Back to Home
          </button>
        </div>
      )}

      <footer className="footer">
        <p>SCP@2025</p>
      </footer>
    </div>
  );
}

export default App;
