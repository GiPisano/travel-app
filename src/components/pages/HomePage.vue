<script>
export default {
  methods: {
    startJourney() {
      this.$router.push({ name: "AddPlace" });
    },
  },
};
</script>

<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Your Travel Diary</h1>
        <p>
          Plan your adventures, organize every detail, and save the memories of
          your journeys all in one place.
        </p>
        <button @click="startJourney">Start Your Journey</button>
      </div>
    </section>

    <section class="features row">
      <div class="feature col-md-3">
        <h2>Add Destinations</h2>
        <p>
          Choose your travel destinations and organize them by days based on
          your itinerary.
        </p>
      </div>

      <div class="feature col-md-3">
        <h2>Daily Plans</h2>
        <p>
          Create daily plans with places you want to visit, restaurants to try,
          and activities to enjoy.
        </p>
      </div>

      <div class="feature col-md-3">
        <h2>Save Memories</h2>
        <p>
          Capture your experiences by saving photos and writing notes for each
          day of your trip.
        </p>
      </div>
    </section>

    <section class="cta">
      <h2>Ready to Start Your Adventure?</h2>
      <p>
        All your data is saved locally on your device. No registration
        required—just enjoy your travels!
      </p>
      <button @click="startJourney">Get Started</button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  font-family: Arial, sans-serif;

  .hero {
    text-align: center;
    padding: 100px 20px;

    .hero-content {
      max-width: 600px;
      margin: 0 auto;
      background-color: rgb(30, 29, 29);
      padding: 20px;
      border-radius: 8px;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.2rem;
        margin-bottom: 20px;
      }

      button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-size: 1rem;
        &:hover {
          background-color: darken(#007bff, 10%);
        }
      }
    }
  }

  .features {
    display: flex;
    justify-content: space-around;
    margin: 50px 0;
    padding: 0 20px;

    .feature {
      text-align: center;
      max-width: 300px;

      h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 1rem;
        color: rgb(208, 206, 206);
      }
    }
  }

  .cta {
    text-align: center;
    padding: 50px 20px;
    background-color: rgb(30, 29, 29);
    h2 {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    button {
      background-color: #28a745;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 1rem;
      &:hover {
        background-color: darken(#28a745, 10%);
      }
    }
  }
}
</style>
